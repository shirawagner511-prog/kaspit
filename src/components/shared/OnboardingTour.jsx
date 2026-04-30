import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const STEPS = [
  { target: 'summary-cards', titleKey: 'tour.step1Title', msgKey: 'tour.step1', placement: 'below' },
  { target: 'month-nav',     titleKey: 'tour.step2Title', msgKey: 'tour.step2', placement: 'below' },
  { target: 'fab',           titleKey: 'tour.step3Title', msgKey: 'tour.step3', placement: 'above' },
  { target: 'nav',           titleKey: 'tour.step4Title', msgKey: 'tour.step4', placement: 'above' },
];

function getRect(target) {
  const el = document.querySelector(`[data-tour="${target}"]`);
  if (!el) return null;
  return el.getBoundingClientRect();
}

export default function OnboardingTour({ onDone }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);

  const current = STEPS[step];

  const updateRect = useCallback(() => {
    setRect(getRect(current.target));
  }, [current.target]);

  useEffect(() => {
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [updateRect]);

  function finish() {
    localStorage.setItem('budgi-tour-done', '1');
    onDone();
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      finish();
    }
  }

  if (!rect) return null;

  const PAD = 8;
  const spotlight = {
    left: rect.left - PAD,
    top: rect.top - PAD,
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };

  const isAbove = current.placement === 'above';
  const tooltipTop = isAbove
    ? spotlight.top - 8  // tooltip will sit above via transform
    : spotlight.top + spotlight.height + 12;

  const tooltipLeft = Math.min(
    Math.max(spotlight.left + spotlight.width / 2, 100),
    window.innerWidth - 100
  );

  return createPortal(
    <div className="tour-overlay" onClick={finish}>
      {/* spotlight cutout via box-shadow */}
      <div
        className="tour-spotlight"
        style={{
          left: spotlight.left,
          top: spotlight.top,
          width: spotlight.width,
          height: spotlight.height,
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* SVG curved arrow */}
      <ArrowSvg rect={rect} placement={current.placement} />

      {/* Tooltip */}
      <div
        className={`tour-tooltip${isAbove ? ' above' : ' below'}`}
        style={{ left: tooltipLeft, top: tooltipTop }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tour-tooltip-title">{t(current.titleKey)}</div>
        <div className="tour-tooltip-msg">{t(current.msgKey)}</div>
        <div className="tour-tooltip-footer">
          <button className="tour-skip" onClick={finish}>{t('tour.skip')}</button>
          <span className="tour-counter">{step + 1}/{STEPS.length}</span>
          <button className="tour-next" onClick={next}>{t('tour.next')}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ArrowSvg({ rect, placement }) {
  const cx = rect.left + rect.width / 2;
  const isAbove = placement === 'above';
  const y1 = isAbove ? rect.top - 20 : rect.bottom + 20;
  const y2 = isAbove ? rect.top - 60 : rect.bottom + 60;

  return (
    <svg
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10001 }}
    >
      <path
        d={`M ${cx} ${y1} C ${cx} ${(y1 + y2) / 2}, ${cx + 30} ${(y1 + y2) / 2}, ${cx + 20} ${y2}`}
        stroke="#2D6A4F"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="5 4"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d={isAbove ? 'M 0 0 L 8 4 L 0 8 Z' : 'M 8 0 L 0 4 L 8 8 Z'} fill="#2D6A4F" />
        </marker>
      </defs>
    </svg>
  );
}

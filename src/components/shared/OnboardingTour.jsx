import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const STEPS = [
  { target: 'summary-cards', titleKey: 'tour.step1Title', msgKey: 'tour.step1', placement: 'below' },
  { target: 'month-nav',     titleKey: 'tour.step2Title', msgKey: 'tour.step2', placement: 'below' },
  { target: 'fab',           titleKey: 'tour.step3Title', msgKey: 'tour.step3', placement: 'above' },
  { target: 'nav',           titleKey: 'tour.step4Title', msgKey: 'tour.step4', placement: 'above' },
];

const TOOLTIP_W = 240;
const TOOLTIP_MARGIN = 16;

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
  const targetCenterX = rect.left + rect.width / 2;

  // Tooltip left edge — center on target, then clamp to viewport
  const idealLeft = targetCenterX - TOOLTIP_W / 2;
  const tooltipLeft = Math.min(
    Math.max(idealLeft, TOOLTIP_MARGIN),
    window.innerWidth - TOOLTIP_W - TOOLTIP_MARGIN
  );

  const tooltipTop = isAbove
    ? spotlight.top - 12 - (isAbove ? 120 : 0)
    : spotlight.top + spotlight.height + 12;

  return createPortal(
    <>
      {/* Dimmed overlay — click outside to dismiss */}
      <div className="tour-overlay" onClick={finish} />

      {/* Spotlight cutout */}
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

      {/* Arrow — sits above overlay and spotlight */}
      <ArrowSvg rect={rect} placement={current.placement} tooltipLeft={tooltipLeft} />

      {/* Tooltip */}
      <div
        className={`tour-tooltip${isAbove ? ' above' : ' below'}`}
        style={{ left: tooltipLeft, top: tooltipTop, transform: 'none' }}
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
    </>,
    document.body
  );
}

function ArrowSvg({ rect, placement, tooltipLeft }) {
  const isAbove = placement === 'above';
  const targetCX = Math.round(rect.left + rect.width / 2);
  const tooltipCX = tooltipLeft + TOOLTIP_W / 2;

  // Tip points at the target edge, tail starts from tooltip edge
  const tipX  = targetCX;
  const tipY  = isAbove ? rect.top - 14 : rect.bottom + 14;
  const tailX = tooltipCX;
  const tailY = isAbove ? rect.top - 108 : rect.bottom + 108;

  const cp1x = tailX;
  const cp1y = isAbove ? tailY + 30 : tailY - 30;
  const cp2x = tipX;
  const cp2y = isAbove ? tipY - 30 : tipY + 30;

  const d = `M ${tailX} ${tailY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tipX} ${tipY}`;

  return (
    <svg
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10003,
        overflow: 'visible',
      }}
    >
      <defs>
        <marker id="comic-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#F4D03F" stroke="#1C1917" strokeWidth="1" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d={d} stroke="#1C1917" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path
        d={d}
        stroke="#F4D03F"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#comic-arrow)"
      />
    </svg>
  );
}

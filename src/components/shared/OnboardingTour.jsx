import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const STEPS = [
  { target: 'summary-cards', titleKey: 'tour.step1Title', msgKey: 'tour.step1', placement: 'below' },
  { target: 'month-nav',     titleKey: 'tour.step2Title', msgKey: 'tour.step2', placement: 'below' },
  { target: 'fab',           titleKey: 'tour.step3Title', msgKey: 'tour.step3', placement: 'above' },
  { target: 'nav',           titleKey: 'tour.step4Title', msgKey: 'tour.step4', placement: 'above' },
];

const TOOLTIP_W   = 240;
const TOOLTIP_H   = 130; // approximate rendered height
const MARGIN      = 16;  // min distance from screen edges
const GAP         = 68;  // space between spotlight edge and tooltip edge (arrow lives here)
const SPOTLIGHT_P = 8;   // padding around target

function getRect(target) {
  const el = document.querySelector(`[data-tour="${target}"]`);
  return el ? el.getBoundingClientRect() : null;
}

export default function OnboardingTour({ onDone }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);

  const current = STEPS[step];

  const updateRect = useCallback(() => setRect(getRect(current.target)), [current.target]);

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
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else finish();
  }

  if (!rect) return null;

  const isAbove = current.placement === 'above';
  const spotlight = {
    left:   rect.left   - SPOTLIGHT_P,
    top:    rect.top    - SPOTLIGHT_P,
    width:  rect.width  + SPOTLIGHT_P * 2,
    height: rect.height + SPOTLIGHT_P * 2,
  };

  // Tooltip horizontal: center on target, clamp to viewport
  const targetCX  = rect.left + rect.width / 2;
  const tooltipLeft = Math.min(
    Math.max(targetCX - TOOLTIP_W / 2, MARGIN),
    window.innerWidth - TOOLTIP_W - MARGIN
  );

  // Tooltip vertical: GAP pixels away from the spotlight edge
  const spotlightBottom = spotlight.top + spotlight.height;
  const tooltipTop = isAbove
    ? spotlight.top - GAP - TOOLTIP_H
    : spotlightBottom + GAP;

  // Arrow: tail at tooltip edge, tip at spotlight edge
  const tooltipCX = tooltipLeft + TOOLTIP_W / 2;
  const arrowTailX = tooltipCX;
  const arrowTailY = isAbove ? tooltipTop + TOOLTIP_H + 4 : tooltipTop - 4;
  const arrowTipX  = targetCX;
  const arrowTipY  = isAbove ? spotlight.top - 4 : spotlightBottom + 4;

  return createPortal(
    <>
      <div className="tour-overlay" onClick={finish} />

      <div
        className="tour-spotlight"
        style={{ left: spotlight.left, top: spotlight.top, width: spotlight.width, height: spotlight.height }}
        onClick={(e) => e.stopPropagation()}
      />

      <ArrowSvg tailX={arrowTailX} tailY={arrowTailY} tipX={arrowTipX} tipY={arrowTipY} isAbove={isAbove} />

      <div
        className="tour-tooltip"
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

function ArrowSvg({ tailX, tailY, tipX, tipY, isAbove }) {
  // Gentle curve: control points bend perpendicular to the travel direction
  const midY = (tailY + tipY) / 2;
  const swing = (tipX - tailX) * 0.5 + (isAbove ? -20 : 20);
  const cp1x = tailX + swing * 0.6;
  const cp1y = isAbove ? midY + 10 : midY - 10;
  const cp2x = tipX - swing * 0.3;
  const cp2y = isAbove ? midY - 10 : midY + 10;

  const d = `M ${tailX} ${tailY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tipX} ${tipY}`;

  return (
    <svg style={{
      position: 'fixed', inset: 0,
      width: '100vw', height: '100vh',
      pointerEvents: 'none',
      zIndex: 10001,
      overflow: 'visible',
    }}>
      <defs>
        <marker id="ca" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#F4D03F" stroke="#1C1917" strokeWidth="1" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d={d} stroke="#1C1917" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d={d} stroke="#F4D03F" strokeWidth="4.5" fill="none" strokeLinecap="round" markerEnd="url(#ca)" />
    </svg>
  );
}

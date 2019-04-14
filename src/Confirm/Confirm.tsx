import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import "./confirm.css";

interface Props {
  title?: string;
  labelConfirm?: string;
  labelCancel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const elementId = "react-confirm-alert";
const elementCSSClass = "react-confirm-alert";

function ConfirmReact(props: Props) {
  return (
    <div className={elementCSSClass}>
      <div
        className={`${elementCSSClass}__body`}
        tabIndex={1}
        role="alertdialog"
        aria-modal="true"
      >
        <h1 className={`${elementCSSClass}__title`}>{props.title}</h1>
        <button
          className={`${elementCSSClass}__button ${elementCSSClass}__button--confirm`}
          onClick={() => {
            props.onConfirm();
            removeConfirmElement();
          }}
        >
          {props.labelConfirm}
        </button>
        <button
          className={`${elementCSSClass}__button ${elementCSSClass}__button--cancel`}
          onClick={() => {
            props.onCancel();
            removeConfirmElement();
          }}
        >
          {props.labelCancel}
        </button>
      </div>
    </div>
  );
}

ConfirmReact.defaultProps = {
  title: "Confirm?",
  labelConfirm: "Ok",
  labelCancel: "Cancel"
};

function removeConfirmElement() {
  const target = document.getElementById(elementId);
  unmountComponentAtNode(target);
  target.parentNode.removeChild(target);
}

export default function confirmReact(props: Props) {
  let divTarget = document.getElementById(elementId);
  if (divTarget) {
    render(<ConfirmReact {...props} />, divTarget);
  } else {
    divTarget = document.createElement("div");
    divTarget.id = elementId;
    document.body.appendChild(divTarget);
    render(<ConfirmReact {...props} />, divTarget);
  }
}

export function confirmReactPromise(props: Partial<Props>) {
  return new Promise(resolve => {
    confirmReact({
      ...props,
      onConfirm: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      }
    });
  });
}

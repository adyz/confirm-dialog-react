import confirmDialog from "./Confirm";

test("confirmDialog default function", () => {
  it("renders the dialog with corect title", () => {
    const mock = {
      title: "Test title",
      onConfirm: jest.fn(),
      onCancel: jest.fn()
    };

    confirmDialog(mock);

    const element = document.getElementById("react-confirm-alert");
    const title = element.querySelector("h1");

    expect(title.textContent).toBe("Test title");
  });

  it("calls the on confirm callback", () => {
    const mock = {
      onConfirm: jest.fn()
    };

    confirmDialog(mock);

    const element = document.getElementById("react-confirm-alert");
    const confirmButton = element.querySelector("button");

    confirmButton.click();

    expect(mock.onConfirm).toBeCalled();
  });

  it("calls the on cancel callback", () => {
    const mock = {
      onConfirm: jest.fn(),
      onCancel: jest.fn()
    };

    confirmDialog(mock);

    const element = document.getElementById("react-confirm-alert");
    const cencelButton = element.querySelectorAll("button")[1];

    cencelButton.click();

    expect(mock.onCancel).toBeCalled();
  });
});

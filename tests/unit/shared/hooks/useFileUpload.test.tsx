import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, renderHook, RenderHookResult } from "@testing-library/react";
import { useFileUpload } from "src/shared/hooks/useFileUpload";

const callback = jest.fn();
let hook: RenderHookResult<ReturnType<typeof useFileUpload>, unknown>;

describe("useFileUpload", () => {
    beforeEach(() => {
        hook = renderHook(() => useFileUpload({ cb: callback }));
    });

    afterEach(() => {
        callback.mockClear();
    });

    it("should call callback with file when input changes", () => {
        //arrange
        const { handleFileInputChange } = hook.result.current;
        const { container } = render(<input type="file" onChange={handleFileInputChange} />);

        const files = [new File(["data"], "name")];

        //act
        fireEvent.change(container.firstChild!, { target: { files } });

        //assert
        expect(callback).toBeCalledWith({ file: files[0], name: files[0].name });
    });

    it("should not call callback when input changes to empty", () => {
        //arrange
        const { handleFileInputChange } = hook.result.current;
        const { container } = render(<input type="file" onChange={handleFileInputChange} />);

        //act
        fireEvent.change(container.firstChild!, { target: { files: null } });

        //assert
        expect(callback).not.toBeCalled();
    });

    it("should activate drop zone when drag over", () => {
        //arrage
        const { handleFileDragOver } = hook.result.current;
        const { container } = render(<input onDragOver={handleFileDragOver} />);

        //act
        fireEvent.dragOver(container.firstChild!);

        //assert
        expect(hook.result.current.isDropZoneActive).toBeTruthy();
    });

    it("should deactivates drop zone when drag leave", async () => {
        //arrage
        const { handleFileDragLeave, handleFileDragOver } = hook.result.current;
        const { container } = render(
            <input onDragLeave={handleFileDragLeave} onDragOver={handleFileDragOver} />
        );

        fireEvent.dragOver(container.firstChild!);
        expect(hook.result.current.isDropZoneActive).toBeTruthy();

        //act
        fireEvent.dragLeave(container.firstChild!);

        //assert
        expect(hook.result.current.isDropZoneActive).toBeFalsy();
    });

    it("should call callback with file when drop", () => {
        //arrange
        const { handleFileDrop } = hook.result.current;
        const { container } = render(<input onDrop={handleFileDrop} />);

        const files = [new File(["data"], "name")];

        //act
        fireEvent.drop(container.firstChild!, { dataTransfer: { files } });

        //assert
        expect(callback).toBeCalledWith({ file: files[0], name: files[0].name });
    });

    it("should not call callback when drop and data transfer is empty", () => {
        //arrange
        const { handleFileDrop } = hook.result.current;
        const { container } = render(<input onDrop={handleFileDrop} />);

        //act
        fireEvent.drop(container.firstChild!, { dataTransfer: null });

        //assert
        expect(callback).not.toBeCalled();
    });

    it("should click the input element", () => {
        //arrange
        const { input, handleAddFileButtonClick } = hook.result.current;
        render(<input ref={input} />);

        const inputClick = jest.spyOn(input.current!, "click");

        //act
        handleAddFileButtonClick();

        //assert
        expect(inputClick).toBeCalledTimes(1);
    });
});

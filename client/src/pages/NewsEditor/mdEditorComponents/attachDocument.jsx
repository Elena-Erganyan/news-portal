import { commands } from "@uiw/react-md-editor";
import { uploadFile } from "../utils";
import ImageInput from "../../../components/ImageInput";
import paperclip from "../../../assets/paperclip-bold.svg";


export const attachDocument = {
  ...commands.image,
  render: (command, disabled, executeCommand) => {
    const allowedFormats = [".docx", ".doc", ".pdf", ".rtf", ".txt", ".odt", ".xlsx", ".xls", ".ppt", ".pptx"];

    const handleChange = (evt) => {
      if (evt.target.files.length && !evt.target.files[0]?.type in allowedFormats) {
        alert(`Допускаются только следующие форматы: ${allowedFormats}`);
        return;
      }

      command.file = evt.target.files[0];
      executeCommand(command, command.groupName);
    };

    return <ImageInput
             handleChange={handleChange}
             accept={allowedFormats.toString()}
             icon={<img src={paperclip} alt="Paperclip" />}
             aria-label="Attach a file"
             disabled={disabled}
           />
  },
  execute: async (state, api) => uploadFile(
    state.command.file,
    "documents",
    (url) => api.replaceSelection(`[${state.command.file.name}](${url})\n`)
  ),
};
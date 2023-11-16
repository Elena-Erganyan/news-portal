import { commands } from "@uiw/react-md-editor";
import { uploadFile } from "../utils";
import ImageInput from "../../../components/ImageInput";


export const insertImage = {
  ...commands.image,
  render: (command, disabled, executeCommand) => {
    const handleChange = (evt) => {
      if (evt.target.files.length && !evt.target.files[0]?.type.match("image.*")) {
        alert("Допускаются только изображения");
        return;
      }

      command.file = evt.target.files[0];
      executeCommand(command, command.groupName);
    };

    return <ImageInput
             handleChange={handleChange}
             accept="image/*"
             icon={commands.image.icon}
             aria-label="Insert an image"
             disabled={disabled}
           />
  },
  execute: async (state, api) => uploadFile(
    state.command.file,
    "images",
    (url) => api.replaceSelection(`![${state.command.file.name}](${url})\n`)
  ),
};
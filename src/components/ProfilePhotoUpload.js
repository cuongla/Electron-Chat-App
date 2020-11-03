import React, { useState } from "react";
import firebase from "firebase/app";
import FileUploader from "react-firebase-file-uploader";

export default function ImageUpload({ name, register }) {
    const [avatar, setAvatar] = useState("");
    const [avatarURL, setAvatarURL] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadStart = () => setIsUploading(true);
    const handleUploadError = error => {
        console.log(error)
        setIsUploading(false);
    }

    const handleUploadSuccess = filename => {
        setAvatar(filename);
        setIsUploading(false);
        firebase
            .storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => {
                setAvatarURL(url)
            })
    }

    const getPhotoNameFromUrl = (url) => {
        return url.substring(
            url.lastIndexOf("%") + 1,
            url.lastIndexOf("?")
        )
    }

    return (
        <div className="form-group">
            <label htmlFor="avatar">Avatar</label>
            <input
                ref={register}
                type="hidden"
                name="avatar"
                value={avatarURL}
                className="form-control"
                id="avatar"
                aria-describedby="emailHelp"
                readOnly
            />
            <br />
            <div style={{
                display: 'flex',
                alignSelf: 'center',
                marginTop: '5px',
                color: 'darkgray'
            }}>
                <label htmlFor="filePicker">
                    <i
                        className="fa fa-plus"
                        style={{
                            fontSize: "26px",
                            cursor: 'pointer', marginRight: '10px',
                        }}
                    ></i>
                </label>
                {avatarURL ?
                    <small>{getPhotoNameFromUrl(avatarURL)}</small> :
                    <small>Upload Photo</small>}
            </div>
            <FileUploader
                id="filePicker"
                accept="image/*"
                name="ProfilePhoto"
                aria-describedby="emailHelp"
                style={{ display: 'none' }}
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
            />
        </div>
    )
}
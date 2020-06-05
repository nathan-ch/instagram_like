import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { loginUser } from '../_Redux/_Authentication/Actions';
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import superBase64 from 'super-base-64';


export const PostImage = (props) => {
    const [image, SetImage] = useState();
    const [description, SetDescription] = useState();
    const [image64, SetImage64] = useState();

    const userToken = useSelector(state => state.authReducer.userToken)
    const dispatch = useDispatch()

    const handleImageInput = (e) => {
        let file = e.target.files[0];
        console.log(file);
        SetImage(file)
        encode(file);
    };

    const handleDescriptionInput = (e) => {
        let description = e;
        SetDescription(description)
    };

    const encode = async (image) => {
        let encodedImage = await superBase64(image);
        SetImage64(encodedImage);
    };

    const handleSubmit = () => {
        const data = {
            stream: image64,
            description: description,
            extension: "image",
        };

        fetch("http://localhost:8080/api/v1/images", {
      method: "post",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error);
      });
  };

        return (
            <div>
                <h1>Poster une nouvelle image</h1>
                <input
                    className="col-md-3"
                    type="file"
                    onChange={(e) => handleImageInput(e)}
                />
                <br/>
                <input
                    className="col-md-3"
                    type="text"
                    value={description}
                    onChange={(e) => handleDescriptionInput(e.target.value)}
                />
                <br/>
                <input
                    className="btn btn-info col-md-3"
                    type="button"
                    value="Upload File"
                    onClick={handleSubmit}
                />
            </div>
        );
    };

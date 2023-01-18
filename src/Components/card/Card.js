import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';
import './Card.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';

export default function Card(props) {

    const navigate = useNavigate();  //variable to protect the page

    const saveNews = () => {
        const newCard = {
            description: props.description,
            url: props.url
        }
        props.readLater(newCard);
    };


    useEffect(() => {                                         //coding start to protect the page
        fetch("http://localhost:9000/auth/isAuthenticated", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // if(data.status===401){
                //     navigate("/login")
                // }

                if (!data.isAuthenticated) {
                    navigate("/login")
                }
            })
    }, [])


    return (


        <div>
            <div className="card user-card ho">
                {/* <img src={props.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.author}</p>
                    <a data-testid="cardbodyclass" href={props.url} target="_blank" className="btn btn-primary mx-2">Open</a>
                    <button type="submit" className="btn btn-primary" onClick={() => {
                        saveNews();
                    }}>Read Later</button> */}



                <MDBCard>
                    <MDBCardImage src={!props.urlToImage?"https://source.unsplash.com/900x600/?cars,technology":props.urlToImage} className="card-img-top" alt="..." />
                    <MDBCardBody>
                        <MDBCardText>
                        <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.author}</p>
                    <a data-testid="cardbodyclass" href={props.url} target="_blank" className="btn btn-primary mx-2">Open</a>
                    <MDBBtn type="submit" className="btn btn-primary" onClick={() => {
                        saveNews();
                    }}>Read Later</MDBBtn>
                        </MDBCardText>
                    </MDBCardBody>
                    </MDBCard>
                </div>
            
            </div>
        // </div>

    )
}
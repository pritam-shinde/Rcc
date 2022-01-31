import React from 'react';
import { ListItem, Avatar } from '@material-ui/core';

const Message = ({ message, scrollRef }) => {
    const convertTime = () => {
        if (message.message.text !== "") {
            const messageSentDate = message.sentAt.split("T")[0].split("-");
            const messageSentTime = message.sentAt.split("T")[1].split(".")[0].split(":");

            let sentAtTimeDate = new Date(messageSentDate[0], messageSentDate[1], messageSentDate[2], messageSentTime[0], messageSentTime[1], messageSentTime[2]);
            sentAtTimeDate.setHours(sentAtTimeDate.getHours() + 5);
            sentAtTimeDate.setMinutes(sentAtTimeDate.getMinutes() + 30);
            return <p>{sentAtTimeDate.getMonth() < 10 ? `0${sentAtTimeDate.getMonth()}` : sentAtTimeDate.getMonth()}/{sentAtTimeDate.getDate() < 10 ? `0${sentAtTimeDate.getDate()}` : sentAtTimeDate.getDate()
            }, {sentAtTimeDate.getHours()}:{sentAtTimeDate.getMinutes() < 10 ? `0${sentAtTimeDate.getMinutes()}` : sentAtTimeDate.getMinutes()}</p>
        } else if (message.message.image !== "") {
            // message.message.sentAt = message.message.sentAt.split(" ");
            // return <p>{message.message.sentAt[1]}/{message.message.sentAt[2]}, {message.message.sentAt[4]}</p>
        }
    }

    return (
        <>
            <ListItem style={{ marginBottom: "1rem" }}>
                <div className="media" style={{ width: "100%" }} ref={scrollRef} >
                    <Avatar sizes='small' src={`./image/${message.senderImage}`} style={{ marginRight: "1rem", height: "1.2rem", width: "1.2rem" }} />
                    <div className="media-body">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h5 className='mt-0' style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#121212", lineHeight: "1.5rem" }}>{message.senderName}</h5>
                            </div>
                            <div>{convertTime()}</div>
                        </div>
                        <div style={{ width: message.message.text !== "" ? "100%" : "30%" }}>
                            {message.message.text !== "" ? <p style={{ fontSize: "0.9375rem", fontWeight: 400, lineHeight: "1.5rem" }} className="text-muted">{message.message.text}</p> : <img src={`./image/${message.message.image}`} alt="message-attachment" className='img-fluid' />}
                        </div>
                    </div>
                </div>
            </ListItem>
        </>
    )
}

export default Message
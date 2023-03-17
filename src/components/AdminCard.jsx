import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminCard = (props) => {
    const {color, title, icon} = props;

    return (
        <div className="col-lg-3">
            <Card className={`card-shadow ${color}`}>
                <div className="text-center text-white py-2">
                    <FontAwesomeIcon icon={icon} />
                    <span> {title}</span>
                </div>
                <CardBody className="text-white">
                    prueba
                </CardBody>
            </Card>
        </div>
    );
}

export default AdminCard;

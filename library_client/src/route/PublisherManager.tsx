import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getPublisherList } from "../api/publisherService";
import PublisherModal from "../component/publisher/PublisherModal";
import PublisherTable from "../component/publisher/PublisherTable";
import { Publisher } from "../types/library";

const PublisherManager = () => {

    const [publishers, setPublishers] = useState<Publisher[]>([]);

    const [loadingPublishers, setLoadingPublishers] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalPublisher, setModalPublisher] = useState<boolean>(false);

    const [selectedPublisher, setSelectedPublisher] = useState<Publisher| undefined>(undefined);

    const getPublishers = () => {
        axiosExecuteGet(
            getPublisherList(),
            setPublishers,
            setLoadingPublishers,
            setError);
    }

    useEffect(() => {
        getPublishers();
    }, []);

    const updateModalPublisher = (publisher: Publisher) => {
        setSelectedPublisher(publisher);
        setModalPublisher(true);
    }

    return (
        <>
            <Container
                className="pt-4"
            >

                <PublisherTable 
                    data={publishers}
                    onEdit={updateModalPublisher}
                />

                <PublisherModal
                    publisher={selectedPublisher}
                    show={modalPublisher}
                    handleHide={() => setModalPublisher(false)}
                />

            </Container>
        </>
    );
}

export default PublisherManager;
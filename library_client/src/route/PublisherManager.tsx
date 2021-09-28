import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getPublisherList } from "../api/publisherService";
import BaseErrorAlert from "../component/BaseErrorAlert";
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
        setSelectedPublisher({...publisher});
        setModalPublisher(true);
    }

    const newModalPublisher = () => {
        setSelectedPublisher(undefined);
        setModalPublisher(true);
    }

    const updatePublisher = (publisher: Publisher) => {

        publishers.forEach((p: Publisher) => {
            if(p.publisherId === publisher.publisherId){
                p.name = publisher.name;
            }
        });

        setPublishers([...publishers]);
    }

    const addPublisher = (publisher: Publisher) => {
        publishers.push(publisher);
        setPublishers([...publishers]);
    }

    return (
        <>
            <Container
                className="pt-4"
            >

                <BaseErrorAlert error={error} />

                <PublisherTable 
                    data={publishers}
                    loading={loadingPublishers}
                    onEdit={updateModalPublisher}
                    onNew={newModalPublisher}
                />

                <PublisherModal
                    publisher={selectedPublisher}
                    show={modalPublisher}
                    handleHide={() => setModalPublisher(false)}
                    update={updatePublisher}
                    add={addPublisher}
                />

            </Container>
        </>
    );
}

export default PublisherManager;
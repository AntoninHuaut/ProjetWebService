import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getPublisherList } from "../api/publisherService";
import BaseAlert from "../component/BaseAlert";
import PublisherModal from "../component/publisher/PublisherModal";
import PublisherTable from "../component/publisher/PublisherTable";
import PublisherDeleteModal from "../component/publisher/PublisherDeleteModal";
import { Publisher } from "../types/library";

const PublisherManager = () => {

    const [publishers, setPublishers] = useState<Publisher[]>([]);

    const [loadingPublishers, setLoadingPublishers] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalPublisher, setModalPublisher] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);

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

    const deleteModalPublisher = (publisher: Publisher) => {
        setSelectedPublisher({...publisher});
        setModalDelete(true);
    }

    const updatePublisher = (publisher: Publisher) => {
        publishers.forEach((p: Publisher) => {
            if(p.publisherId === publisher.publisherId){
                p.name = publisher.name;
            }
        });
        setPublishers([...publishers]);
    }

    const deletePublisher = (publisherId: number) => {
        let p = publishers.find(p => p.publisherId === publisherId) ?? {name: "", publisherId: -1};

        const index = publishers.indexOf(p);
        if (index > -1) {
            publishers.splice(index, 1);
        }
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

                <BaseAlert msg={error} close={() => setError('')} />

                <PublisherTable 
                    data={publishers}
                    loading={loadingPublishers}
                    onEdit={updateModalPublisher}
                    onNew={newModalPublisher}
                    onDelete={deleteModalPublisher}
                />

                <PublisherModal
                    publisher={selectedPublisher}
                    show={modalPublisher}
                    handleHide={() => setModalPublisher(false)}
                    update={updatePublisher}
                    add={addPublisher}
                />

                {selectedPublisher &&
                    <PublisherDeleteModal 
                        publisher={selectedPublisher}
                        show={modalDelete}
                        handleHide={() => setModalDelete(false)}
                        removeFromList={deletePublisher}
                    />
                }

            </Container>
        </>
    );
}

export default PublisherManager;
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { axiosExecuteGet } from "../api/axiosUtils";
import { getPublisherList } from "../api/publisherService";
import PublisherTable from "../component/publisher/PublisherTable";
import { Publisher } from "../types/library";

const PublisherManager = () => {

    const [publishers, setPublishers] = useState<Publisher[]>([]);

    const [loadingPublishers, setLoadingPublishers] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

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

    return (
        <>
            <Container
                className="pt-4"
            >

                <PublisherTable 
                    data={publishers}
                />

            </Container>
        </>
    );
}

export default PublisherManager;
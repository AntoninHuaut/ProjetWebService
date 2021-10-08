import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { axiosExecuteGet, axiosExecutePost } from "../api/axiosUtils";


interface Props {
    onTypeSearch?: boolean,
    onEnterSearch?: boolean,
    setData: (data: any) => any,
    searchFunction: (querry: string) => any
}

const SearchData = ({
    setData,
    searchFunction,
    onTypeSearch= true,
    onEnterSearch= false
}: Props) => {


    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if(onTypeSearch){
            searchData();
        }
    }, [search]);
    

    const onType = (e: any) => {
        setSearch(e.target.value);
    }


    const onEnter = (e: any) => {
        if(onEnterSearch && e.key === 'Enter') {
            searchData();
        }
    }

    const searchData = () => {
        axiosExecuteGet(searchFunction(search),
            setData,
            () => {},
            () => {}
        );
    }

    return (
        <>

            <Form.Control
                value={search}
                placeholder="Search"
                onChange={onType}
                onKeyDown={onEnter}
            />

        </>
    )

}

export default SearchData;
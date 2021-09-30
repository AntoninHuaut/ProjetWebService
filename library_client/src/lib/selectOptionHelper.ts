import { MultiValue } from "react-select";
import { SelectOption } from "../types/common"
import { Author, Publisher } from "../types/library"


export const authorToSelectOption = (authors: Author[]) : SelectOption[] => {
    let arr: SelectOption[] = [];

    authors.forEach(author => arr.push({value: author.authorId.toString(), label: author.name}));

    return arr;
}

export const getAuthorsFromSelectOptions = (authors: Author[], selectOptions: MultiValue<SelectOption>) : Author[] => {
    let res: Author[] = [];

    authors.forEach((author) => {
        if(selectOptions.find(opt => opt.value === author.authorId.toString()) !== undefined){
            res.push(author);
        }
    });

    return res;
}


export const publishersToSelectOption = (publishers: Publisher[]) : SelectOption[] => {
    let arr: SelectOption[] = [];

    publishers.forEach(publisher => arr.push({value: publisher.publisherId.toString(), label: publisher.name}));

    return arr; 
}

export const publisherToSelectOption = (publisher: Publisher) : SelectOption => {

    return {
       value: publisher.publisherId?.toString() ?? '',
       label: publisher.name ?? ''
    };

}

export const getPublisherFromSelectOptions = (publishers: Publisher[], selectOptions: SelectOption) : Publisher => {

    let res = {publisherId: -1, name: ''}
    
    publishers.forEach((p) => {
        if(selectOptions.value === p.publisherId.toString()){
            res = p;
        }
    });

    return res;
}
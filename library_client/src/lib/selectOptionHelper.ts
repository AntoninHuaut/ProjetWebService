import { MultiValue } from "react-select";
import { SelectOption } from "../types/common"
import { Author, Publisher } from "../types/library"
import { UserRole } from "../types/login";


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

export const roleSelectOptions = () : SelectOption[] => {

    let arr : SelectOption[] = [];

    arr.push({value: UserRole.CONSULT_ROLE.toString(), label: "Consultant"});
    arr.push({value: UserRole.CONTRIBUTOR_ROLE.toString(), label: "Contributeur"});
    arr.push({value: UserRole.ADMINISTRATOR_ROLE.toString(), label: "Administrateur"});
    arr.push({value: UserRole.BORROW_ROLE.toString(), label: "Emprunteur"});

    return arr;
}

export const roleToSelectOption = (role: number, roleList: SelectOption[]) : SelectOption => {

    for(let i = 0; i < roleList.length; i++){
        if(roleList[i].value === role.toString()){
            return roleList[i];
        }
    }

    return {
        value: role.toString(),
        label: ""
    }

}

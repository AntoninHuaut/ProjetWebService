import { MultiValue } from "react-select";
import { SelectOption } from "../types/common"
import { Author, Book, Publisher } from "../types/library"
import { User, UserRole } from "../types/login";


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

    arr.push({value: UserRole.CONSULT_ROLE.toString(), label: "Consult"});
    arr.push({value: UserRole.BORROW_ROLE.toString(), label: "Borrow"});
    arr.push({value: UserRole.CONTRIBUTOR_ROLE.toString(), label: "Contributor"});
    arr.push({value: UserRole.ADMINISTRATOR_ROLE.toString(), label: "Administrator"});

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


export const getBookFromSelectOptions = (books: Book[], selectOptions: SelectOption) : Book => {

    let res = {bookId: -1, title: ""} as Book
    
    books.forEach((b) => {
        if(selectOptions.value === b.bookId.toString()){
            res = b;
        }
    });

    return res;
}


export const getUserFromId = (users: User[], userId: string) : User => {

    let res: User = {userId: -1, userName: "Unknown"} as User;
    
    users.forEach((u) => {
        if(userId === u.userId.toString()){
            res = u;
        }
    });

    return res;
}

export const usersToSelectOption = (users: User[]) : SelectOption[] => {
    let arr: SelectOption[] = [];

    users.forEach(user => arr.push({value: user.userId.toString(), label: user.userName}));

    return arr; 
}

export const booksToSelectOption = (books: Book[]) : SelectOption[] => {
    let arr: SelectOption[] = [];

    books.forEach(book => arr.push({value: book.bookId.toString(), label: book.title}));

    return arr; 
}
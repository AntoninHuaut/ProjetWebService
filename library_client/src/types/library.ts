export interface Publisher {
    publisherId: number;
    name: string;
}

export interface Author {
    authorId: number;
    name: string;
}

export interface Book {
    bookId: number;
    title: string;
    publicationYear: number;
    description: string;
    state: BookState;
    authors: Author[];
    publisher: Publisher;
}

export enum BookState {
    AVAILABLE,
    BORROWED,
    UNAVAILABLE
}

export interface Borrow {
    borrowId: number;
    bookId: Book;
    userId: number;
    borrowDate: Date;
    maxBorrowDayDuration: Date;
    returnedDate: Date;
}
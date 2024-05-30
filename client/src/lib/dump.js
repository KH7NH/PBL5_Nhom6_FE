import { toast } from "sonner";

export const createBoard = (data) => {
    const currentData = localStorage.getItem("boards") ? JSON.parse(localStorage.getItem("boards")) : [];
    const newData = [...currentData, { ...data, id: currentData.length + 1, list: [] }];
    localStorage.setItem("boards", JSON.stringify(newData));
    toast.success("Tạo bảng thành công");
    return newData;
}

export const getBoards = () => {
    return localStorage.getItem("boards") ? JSON.parse(localStorage.getItem("boards")) : [];
}

export const createList = (id, data) => {
    const currentData = localStorage.getItem("boards") ? JSON.parse(localStorage.getItem("boards")) : [];
    const newData = currentData.map((board) => {
        if (board.id == id) {
            return { ...board, list: [...board.list, { ...data, id: board.list.length + 1, card: [] }] }
        }
        return board
    });
    localStorage.setItem("boards", JSON.stringify(newData));
    toast.success("Tạo danh sách thành công");
    return newData.find((board) => board.id == id);
}

export const createCard = (id,listId, data) => {
    const currentData = localStorage.getItem("boards") ? JSON.parse(localStorage.getItem("boards")) : [];
    const newData = currentData.map((board) => {
        if (board.id == id) {
            return { ...board, list: board.list.map((list) => {
                if (list.id == listId) {
                    return { ...list, card: [...list.card, { ...data, id: `card-${listId}-${list.card.length + 1}` }] }
                }
                return list
            }) }
        }
        return board
    })
    localStorage.setItem("boards", JSON.stringify(newData));
    toast.success("Tạo thẻ thành công");
    return newData.find((board) => board.id == id);
}

export const changeOrderColumn = (boardId, newList) => {
    const currentData = localStorage.getItem("boards") ? JSON.parse(localStorage.getItem("boards")) : [];
    const newData = currentData.map((board) => {
        if (board.id == boardId) {
            return { ...board, list: newList }
        }
        return board
    })
    localStorage.setItem("boards", JSON.stringify(newData));
}
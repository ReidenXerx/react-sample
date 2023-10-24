import { getSelectedChat, getAllChats } from '@store/selectors/chats'
import {
  createChat,
  setSelectedChatAction,
  Chat,
  deleteChatAction,
  editChatNameAction,
  addMessageAction,
} from '@store/slices/chat/allChats'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

export const useChats = () => {
  const dispatch = useDispatch()
  const selectedChat: Chat | undefined = useSelector(getSelectedChat)
  const chats: Chat[] = useSelector(getAllChats)

  const onSelectChat = (id: string) => {
    dispatch(setSelectedChatAction({ id }))
  }

  const onCreateChat = () => {
    const chat = {
      id: `${uuidv4()}`,
      name: `new chat ${uuidv4()}`,
      messages: [],
    }
    dispatch(createChat({ chat }))
  }

  const onDeleteChat = (id: string) => {
    dispatch(deleteChatAction({ id }))
  }

  const onEditChatName = (id: string, name: string) => {
    dispatch(editChatNameAction({ id, name }))
  }

  const sendMessage = (
    chatId: string,
    messageText: string,
    isRequest: boolean,
  ) => {
    const message = {
      text: messageText,
      isRequest,
    }
    dispatch(addMessageAction({ chatId, message }))
    if (isRequest) {
      setTimeout(() => {
        sendMessage(chatId, `${messageText} response`, false)
      }, 2000)
    }
  }

  return {
    chats,
    selectedChat,
    onSelectChat,
    onCreateChat,
    onDeleteChat,
    onEditChatName,
    sendMessage,
  }
}

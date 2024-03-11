import React, {
  DragEvent,
  DragEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  AiOutlineUnorderedList,
  AiFillFilePdf,
  AiFillFileText,
  AiFillFileWord,
  AiFillFileExcel,
  AiOutlineFile
} from 'react-icons/ai'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FiEdit3 } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
// import { useHistory } from 'react-router-dom'
import { utimes } from 'fs/promises'
import { number, string } from 'yup'

import ButtonCircle from '../ButtonCircle'

import { Container, ContainerItem } from './styles'
// import api from '../../server/api'
import { useToast } from '../../hooks/toast'
import FormAddPost from '../FormAddPost'
import NoteProblemData from '../../DTO/noteProblemDTO'
import NoteProblemDataItems from '../../DTO/noteProblemItemsDTO'

interface NoteProblemCardEditData {
  id: string
  title: string
  tag: string
}

interface ItemDataTST {
  id: string
  type: string
  text?: string
  file?: {
    url: string
    name: string
  }
}

interface NoteProblemCardProps {
  data: NoteProblemData
  disabled?: boolean
  list?: ItemDataTST[]
  removeCard?: boolean
  editCard?: boolean
  onClickCard?(id: string): void
  onEditPostCard?(dataPost: NoteProblemDataItems): void
  onReloadData?(): void
}

const NoteProblemCard: React.FC<NoteProblemCardProps> = ({
  data,
  list,
  disabled,
  removeCard,
  editCard,
  onClickCard,
  onReloadData,
  onEditPostCard
}) => {
  // const history = useHistory()
  const { addToast } = useToast()
  const dragItem = useRef<number>(0)
  const dragOverItem = useRef<number>(0)
  const [currentList, setCurrentList] = useState<ItemDataTST[]>(list || [])
  const [selectedPost, setSelectedPost] = useState<string>()
  const [selectedPostEdit, setSelectedPostEdit] = useState<string>()
  const [loadingRMPost, setLoadingRMPost] = useState(false)
  const [loadingRMScript, setLoadingRMScript] = useState(false)

  const removeScript = useCallback(
    async (id: string) => {
      try {
        setLoadingRMScript(true)
        // await api.delete(`script?id=${id}`)
        setLoadingRMScript(false)
        // history.push('/home')
        addToast({
          type: 'success',
          title: 'Script Removido com sucesso'
        })
      } catch (error) {
        setLoadingRMScript(false)
        addToast({
          type: 'error',
          title: 'Ops!',
          description:
            'Houve um erro ao tentar remover o Script, tente novamente'
        })
      }
    },
    [addToast]
  )

  const removePost = useCallback(
    async (id: string) => {
      try {
        setSelectedPost(id)
        setLoadingRMPost(true)
        // await api.delete(`post?id=${id}`)
        if (typeof onReloadData === 'function') {
          onReloadData()
        }
        setLoadingRMPost(false)
        setSelectedPost(undefined)
        addToast({
          type: 'success',
          title: 'Post Removido com sucesso'
        })
      } catch (error) {
        setLoadingRMPost(false)
        setSelectedPost(undefined)
        addToast({
          type: 'error',
          title: 'Ops!',
          description: 'Houve um erro ao tentar remover o Post, tente novamente'
        })
      }
    },
    [onReloadData, addToast]
  )

  const handleEditPost = useCallback(
    async (postData: NoteProblemDataItems) => {
      setSelectedPostEdit(postData.id)

      if (typeof onEditPostCard === 'function') {
        onEditPostCard(postData)
      }
    },
    [onEditPostCard]
  )

  const handleEditScript = useCallback((dataScript: NoteProblemData) => {
    // history.push('/edit-script', {
    //   data: {
    //     id: dataScript.id,
    //     title: dataScript.name,
    //     tag: dataScript.tag
    //   }
    // })
  }, [])

  const getSuffix = useCallback((name: string) => {
    const position = name.indexOf('.')
    const type = name.substring(position)
    if (type) return type
    return ''
  }, [])

  const getIcon = useCallback((name: string) => {
    const position = name.indexOf('.')
    const type = name.substring(position)

    switch (type) {
      case '.pdf':
        return <AiFillFilePdf />
      case '.docx':
        return <AiFillFileWord color="#1e73e7" />
      case '.doc':
        return <AiFillFileWord color="#1e73e7" />

      case '.xls':
        return <AiFillFileExcel color="#2f7d31" />

      case '.xlsx':
        return <AiFillFileExcel color="#2f7d31" />

      case '.xlsm':
        return <AiFillFileExcel color="#2f7d31" />

      case '.xlsb':
        return <AiFillFileExcel color="#2f7d31" />

      case '.xltx':
        return <AiFillFileExcel color="#2f7d31" />

      default:
        return <AiOutlineFile color="#1e73e7" />
    }
  }, [])

  const dragStart = (
    e: DragEvent<HTMLDivElement>,
    position: number
  ): string => {
    dragItem.current = position
    // console.log(dragItem.current);
    // console.log(e.currentTarget.innerHTML);
    return ''
  }

  const dragEnter = (
    e: DragEvent<HTMLDivElement>,
    position: number
  ): string => {
    dragOverItem.current = position
    // console.log(e.currentTarget.innerHTML);
    return ''
  }

  const drop = useCallback(async () => {
    let copyListItems: NoteProblemDataItems[] = []
    if (currentList) copyListItems = [...currentList]

    if (dragItem) {
      const dragItemContent = copyListItems[dragItem.current]
      copyListItems.splice(dragItem.current, 1)
      copyListItems.splice(dragOverItem.current, 0, dragItemContent)
      dragItem.current = 0
      dragOverItem.current = 0
      setCurrentList(copyListItems)
      const idList = copyListItems.map(item => item.id)

      try {
        // await api.post('/post/reorder', idList)
      } catch (error) {
        console.log(error)
      }
    }

    // return string;
  }, [currentList])

  return (
    <Container disabled={disabled}>
      <button
        disabled={disabled}
        type="button"
        onClick={() => {
          typeof onClickCard === 'function' && data.id && onClickCard(data.id)
        }}
      >
        <div className="scriptHeader">
          {/* <div className="scriptIcon">
            <AiOutlineUnorderedList size={25} />
          </div> */}
          <div className="scriptHeaderContant">
            <div className="scriptTitle">
              <strong>{data.name}</strong>
            </div>
            <div className="scriptTag">
              <strong>
                <span>Fazenda: </span>
                GRUPO PRINCESA
                {/* {data.farm.name} */}
              </strong>
            </div>
            <div className="scriptTag">
              <strong>
                <span>Data: </span>
                17/10/2022
                {/* {data.farm.name} */}
              </strong>
            </div>
          </div>
          {editCard && (
            <div className="editScript">
              <ButtonCircle
                className="edit"
                onClick={() => handleEditScript(data)}
              >
                <FiEdit3 size={14} />
              </ButtonCircle>
            </div>
          )}
          {removeCard && (
            <div className="removeScript">
              <ButtonCircle
                className="delete"
                onClick={() => removeScript(data.id)}
              >
                {loadingRMScript ? (
                  <i className="fa fa-circle-o-notch fa-spin" />
                ) : (
                  <BsTrash size={14} />
                )}
              </ButtonCircle>
            </div>
          )}
        </div>
      </button>
      {currentList &&
        currentList.map((item, index) => {
          return (
            <ContainerItem
              key={item.id}
              draggable
              onDragStart={e => dragStart(e, index)}
              onDragEnter={e => dragEnter(e, index)}
              onDragEnd={drop}
            >
              <div className="scriptItens">
                <div className="scriptContent">
                  <div className="scriptItenIcon">
                    <FaArrowCircleRight size={12} />
                  </div>
                  <div className="content">
                    {item.type === 'text' && item.text && (
                      <div className="media">
                        <strong>{item.text}</strong>
                      </div>
                    )}
                    {item.file && (
                      <>
                        {item.type === 'file' && (
                          <div className="mediaImage">
                            <strong className="label">Envio de Arquivo</strong>
                            <a
                              href={`${item.file.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="pdfFile">
                                {getIcon(item.file.name)}
                              </div>
                            </a>
                            <strong className="caption">
                              {`${
                                item.text
                                  ? item.text + getSuffix(item.file.name)
                                  : item.file.name
                              }`}
                            </strong>
                          </div>
                        )}

                        {item.type === 'image' && item.file && (
                          <div className="mediaImage">
                            <strong className="label">Envio de Imagem:</strong>
                            <img
                              src={`${item.file.url}`}
                              alt="Imagem a ser enviada"
                            />
                          </div>
                        )}
                        {item.type === 'video' && item.file && (
                          <div className="mediaImage">
                            <strong className="label">Envio de Vídeo:</strong>
                            <video width="320" height="240" controls muted>
                              <source
                                src={`${item.file.url}`}
                                type="video/mp4"
                              />
                              <source
                                src={`${item.file.url}`}
                                type="video/ogg"
                              />
                              Seu navegador não consegue reproduzir esse vídeo
                            </video>
                          </div>
                        )}
                        {item.type === 'pdf' && item.file && (
                          <div className="mediaImage">
                            <strong className="label">Envio de Arquivo:</strong>
                            <a
                              href={`${item.file.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="pdfFile">
                                <AiFillFilePdf />
                              </div>
                            </a>
                          </div>
                        )}
                        {item.type === 'audio' && item.file && (
                          <div className="mediaImage">
                            <strong className="label">Envio de Áudio:</strong>
                            <audio controls muted>
                              <source
                                src={`${item.file.url}`}
                                type="audio/ogg"
                              />
                              <source
                                src={`${item.file.url}`}
                                type="audio/mpeg"
                              />
                            </audio>
                          </div>
                        )}
                      </>
                    )}

                    {/* <div className="time">
                      <strong>{`${item.time.toString()}s`}</strong>
                    </div> */}
                  </div>

                  <div className="removeScript editScript">
                    <ButtonCircle onClick={() => handleEditPost(item)}>
                      {loadingRMPost && selectedPost === item.id ? (
                        <i className="fa fa-circle-o-notch fa-spin" />
                      ) : (
                        <FiEdit3 size={14} />
                      )}
                    </ButtonCircle>
                  </div>

                  <div className="removeScript">
                    <ButtonCircle
                      className="delete"
                      onClick={() => removePost(item.id)}
                    >
                      {loadingRMPost && selectedPost === item.id ? (
                        <i className="fa fa-circle-o-notch fa-spin" />
                      ) : (
                        <BsTrash size={14} />
                      )}
                    </ButtonCircle>
                  </div>
                </div>
              </div>
              {selectedPostEdit && selectedPostEdit === item.id && (
                <FormAddPost
                  initialData={item}
                  onCancelEdit={() => {
                    setSelectedPostEdit('')
                  }}
                  onReloadData={() => {
                    if (typeof onReloadData === 'function') {
                      setSelectedPostEdit('')
                      onReloadData()
                    }
                  }}
                />
              )}
            </ContainerItem>
          )
        })}
    </Container>
  )
}

export default NoteProblemCard
NoteProblemCard.defaultProps = {
  list: [],
  removeCard: false,
  editCard: false,
  disabled: false,
  onClickCard: () => {
    /* function */
  },
  onReloadData: () => {
    /* function */
  },
  onEditPostCard: () => {
    /* function */
  }
}

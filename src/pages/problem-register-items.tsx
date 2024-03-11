import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import Head from 'next/head'
import { format } from 'date-fns'
import Router from 'next/router'
import { MdQrCode2 } from 'react-icons/md'
import { CgClose } from 'react-icons/cg'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiFillFileWord,
  AiOutlineFile
} from 'react-icons/ai'
import { FormHandles } from '@unform/core'
import {
  Container,
  Content,
  FormScrip,
  ConainerTitle
} from '../styles/pages/RegisterPages'
import Input from '../components/Input'
import Button from '../components/Button'
import Header from '../components/Header'
import { listMenusManagerAdm, listMenusOparation } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import getValidationsErrors from '../utils/getValidationErrors'
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'
import { useAuth } from '../hooks/auth'
import { withSSRAuth } from '../hocs/withSSRAuth'
import Select from '../components/Select'
import ButtonCircle from '../components/ButtonCircle'
import SelectData from '../DTO/selectDTO'
import PatrimonyData from '../DTO/patrimonyDTO'
import { setupAPIClient } from '../server/api'
import ButtonFile from '../components/ButtonFile'
import TextArea from '../components/TextArea'
import NoteProblemCard from '../components/NoteProblemCard'

const tst = {
  id: '123',
  active: true,
  name: 'Colheitadeira 002',
  // user: {
  //   name: 'Izabela Andrade',
  //   cpf: '111.455.716-11'
  // },
  user_id: '123',
  farm_id: '123'
  // farm?: FarmData
  // items: NoteProblemDataItems[]
}

const listTest = [
  {
    id: '123',
    type: 'text',
    text: 'Começou sair fumaça do motor e está apresentando um barulho estranho ao tentar dar partida'
  },
  {
    id: '456',
    type: 'image',
    file: {
      url: 'https://cdn.pixabay.com/photo/2017/08/11/16/33/tractor-2632010_1280.jpg',
      name: 'img_3004'
    }
  },
  {
    id: '7',
    type: 'image',
    file: {
      url: 'https://cdn.pixabay.com/photo/2016/08/28/00/54/tractor-1625221__480.jpg',
      name: 'img_3004'
    }
  }
]

const mediaType = [
  { value: 'text', label: 'Texto' },
  { value: 'audio', label: 'Áudio' },
  { value: 'image', label: 'Imagem' },
  { value: 'video', label: 'Vídeo' },
  { value: 'file', label: 'Arquivo' }
]

interface ProblemRegisterProps {
  list: SelectData[]
}

const ProblemRegister: React.FC<ProblemRegisterProps> = ({ list }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut, user, farmId } = useAuth()
  const [loading, setLoading] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [listPatrimony, setListPatrimony] = useState(list || [])
  const [fileList, setFileList] = useState<File[]>([])
  const [fileGeneric, setFileGeneric] = useState<File>()
  const [fileVideo, setFileVideo] = useState<File>()
  const [selectedAudio, setSelectedAudio] = useState<File>()
  const [audioPreview, setAudioPreview] = useState<string>()
  const [filePreview, setFilePreview] = useState<string[]>([])
  const [loadingImage, setLoadingImage] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(true)
  const [selectedType, setSelectedType] = useState<SelectData>({} as SelectData)
  // const [scriptData, setScriptData] = useState<ScriptData>({} as ScriptData)

  const [selectedPatrimony, setSelectedPatrimony] = useState<SelectData>()

  const getListPatrimonyItens = useCallback(async () => {
    try {
      const responsePatrimony = await api.get('/patrimonyitem')
      const list = responsePatrimony.data.map((data: PatrimonyData) => {
        return { value: data.id, label: data.name }
      })
      setListPatrimony(list)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signOut()
      }
    }
  }, [signOut])

  useEffect(() => {
    getListPatrimonyItens()
  }, [])

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleSubmit = useCallback(
    async (data: { patrimony: SelectData }) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        if (!selectedPatrimony) {
          const yupSchema = {
            patrimony: Yup.string().required('Patrimônio Obrigatório')
          }
          const schema = Yup.object().shape(yupSchema)

          await schema.validate(data, { abortEarly: false })
          return
        }
        const filds: Record<string, undefined> = {}
        Object.assign(filds, { patrimony_id: selectedPatrimony.value })
        const fDate = format(new Date(), 'yyyy-MM-dd')

        // await api.post('/patrimonygroup', { name: data.name })
        formRef.current.reset()
        setSelectedPatrimony(null)
        setLoading(false)
        Router.back()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Check-in ralizado com sucesso! Bom trabalho.'
        })
      } catch (error) {
        setLoading(false)
        console.log(error.response)
        if (error instanceof Yup.ValidationError) {
          console.log(error)
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        if (error.response && error.response.status === 401) {
          signOut()
          return
        }
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message
        ) {
          addToast({
            type: 'error',
            title: 'Ops!',
            description: `${error.response.data.message}`
          })

          return
        }
        if (error === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Houve um erro ao tentar cadastrar grupo de patrimônio',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente.'
          })
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description:
            'Houve um erro ao cadastrar grupo de patrimônio, tente novamente.'
        })
      }
    },
    [signOut, selectedPatrimony, user, farmId]
  )

  const handleChangePatrimony = useCallback(data => {
    if (data) {
      setSelectedPatrimony(data)
    } else {
      setSelectedPatrimony(null)
    }
  }, [])

  const handleChangeValue = useCallback(e => {
    console.log(e)
    if (e) {
      setSelectedType(e)
    } else {
      setSelectedType({} as SelectData)
    }
    setFilePreview([])
    setAudioPreview('')
    setFileList([])
    setFileGeneric(undefined)
    setFileVideo(undefined)
    setSelectedAudio(undefined)
  }, [])

  const handleChangeFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file: File = event.target.files[0]
        setFileGeneric(file)
      }
      setLoadingImage(false)
    },
    []
  )

  const handleChangeVideo = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file: File = event.target.files[0]
        setFileVideo(file)
      }
      setLoadingImage(false)
    },
    []
  )

  const handleChangeImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const { files } = event.target
        const result = Object.keys(files)
        const listItems = result.map(key => {
          return files[parseInt(key, 10)]
        })

        const listFile: File[] = []
        listItems.forEach((file: File) => {
          if (file && file.type.substring(0, 5) === 'image') {
            listFile.push(file)
          }
        })
        if (listFile.length > 0) {
          console.log(listFile[0])
          setFileList(listFile)
        }
      }
      setLoadingImage(false)
    },
    []
  )

  const handleChangeAudio = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setSelectedAudio(event.target.files[0])
      }
      setLoadingImage(false)
    },
    []
  )

  const handleRemoveImage = useCallback(() => {
    setFileList([])
    setLoadingImage(false)
  }, [])

  const handleRemoveFilePdf = useCallback(() => {
    setFileGeneric(undefined)
  }, [])

  const handleRemoveAudio = useCallback(() => {
    setSelectedAudio(undefined)
  }, [])

  const handleRemoveVideo = useCallback(() => {
    setFileVideo(undefined)
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

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu}></Header>
      <MenuDrawer visible={menuVisible} listMenus={listMenusOparation} />
      <Content>
        <TitleRegisters>Informe de Problema</TitleRegisters>
        <NoteProblemCard
          data={tst}
          list={listTest}
          removeCard
          editCard
          disabled
          // onReloadData={() => getInitialData()}
          // onEditPostCard={postData => onEditPost(postData)}
        />
        <FormScrip ref={formRef} onSubmit={handleSubmit}>
          <div className="dobleLeft">
            <Select
              label="Tipo de mídea"
              name="type"
              required
              options={mediaType}
              onChange={e => handleChangeValue(e)}
              isClearable
            />
          </div>
          {selectedType.value === 'file' && (
            <div className="dobleLeft">
              <Input label="Renomear o arquivo" name="rename" />
            </div>
          )}
          {selectedType.value && (
            <>
              {selectedType.value === 'text' ? (
                // <Input label="Mensagem" name="text" required />
                <TextArea label="Relato" name="text" required />
              ) : (
                <>
                  {selectedType.value === 'file' && (
                    <div className="containerImage">
                      {fileGeneric ? (
                        <div className="selectedPDF">
                          {getIcon(fileGeneric?.name)}
                          <button type="button" onClick={handleRemoveFilePdf}>
                            <CgClose size={16} />
                          </button>
                        </div>
                      ) : (
                        <ButtonFile
                          type="file"
                          onChangeFile={handleChangeFile}
                        />
                      )}
                    </div>
                  )}
                  {selectedType.value === 'image' && (
                    <div className="containerImage">
                      {filePreview && filePreview.length > 0 ? (
                        <div className="selectedImage">
                          <img
                            src={filePreview[0]}
                            alt="imagem selecionda para entar no script"
                          />
                          <button type="button" onClick={handleRemoveImage}>
                            <CgClose size={16} />
                          </button>
                        </div>
                      ) : (
                        <ButtonFile
                          type="image/*"
                          onChangeFile={handleChangeImage}
                        />
                      )}
                    </div>
                  )}
                  {selectedType.value === 'video' && (
                    <div className="containerVideo">
                      {fileVideo && fileVideo.name ? (
                        <div className="selectedFile">
                          <strong>{fileVideo.name}</strong>
                          <button type="button" onClick={handleRemoveVideo}>
                            <CgClose size={16} />
                          </button>
                        </div>
                      ) : (
                        <ButtonFile
                          type="video/*"
                          onChangeFile={handleChangeVideo}
                        />
                      )}
                    </div>
                  )}
                  {selectedType.value === 'audio' && (
                    <div className="containerAudio">
                      {audioPreview ? (
                        <div className="selectedAudio">
                          <audio controls muted>
                            <source src={audioPreview} type="audio/ogg" />
                          </audio>
                          <button type="button" onClick={handleRemoveAudio}>
                            <CgClose size={16} />
                          </button>
                        </div>
                      ) : (
                        <ButtonFile
                          type=".mp3,audio/*"
                          onChangeFile={handleChangeAudio}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <div className="containerButton">
            <Button title="+ Adicionar" type="submit" loading={loading} />
          </div>
        </FormScrip>
      </Content>
    </Container>
  )
}

export default ProblemRegister
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const responsePatrimony = await apiClient.get('/patrimonyitem')

  const list = responsePatrimony.data.map((data: PatrimonyData) => {
    return { value: data.id, label: data.name }
  })
  return {
    props: { list }
  }
})

import { FormHandles } from '@unform/core'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import * as Yup from 'yup'
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiFillFileWord,
  AiOutlineFile
} from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import FileData from '../../DTO/fileDTO'
import SelectData from '../../DTO/selectDTO'
import { useToast } from '../../hooks/toast'
// import File from '../../DTO/fileDTO';
import Button from '../Button'
import ButtonFile from '../ButtonFile'
import Input from '../Input'
import Select from '../Select'
import TextArea from '../TextArea'

import { FormScrip } from './styles'
// import api from '../../server/api'
import getValidationsErrors from '../../utils/getValidationErrors'
import NoteProblemDataItems from '../../DTO/noteProblemItemsDTO'

interface FormAddPostProps {
  initialData: NoteProblemDataItems
  onReloadData?(): void
  onCancelEdit?(): void
}

interface FormData {
  type: SelectData
  text: string
  rename: string
  time: number
}

const mediaType = [
  { value: 'text', label: 'Texto' },
  { value: 'audio', label: 'Áudio' },
  { value: 'image', label: 'Imagem' },
  { value: 'video', label: 'Vídeo' },
  { value: 'file', label: 'Arquivo' }
]

const FormAddPost: React.FC<FormAddPostProps> = ({
  initialData,
  onReloadData,
  onCancelEdit
}) => {
  const convertForSelect = (type: string): SelectData => {
    switch (type) {
      case 'text':
        return { value: 'text', label: 'Texto' }

      case 'audio':
        return { value: 'audio', label: 'Áudio' }

      case 'image':
        return { value: 'image', label: 'Imagem' }

      case 'video':
        return { value: 'video', label: 'Vídeo' }

      case 'file':
        return { value: 'file', label: 'Arquivo' }

      default:
        return {} as SelectData
    }
  }

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const [fileImage, setFileImage] = useState<File>()
  const [fileGeneric, setFileGeneric] = useState<File>()
  const [fileVideo, setFileVideo] = useState<File>()
  const [selectedAudio, setSelectedAudio] = useState<File>()
  const [audioPreview, setAudioPreview] = useState<string>()
  const [filePreview, setFilePreview] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const [selectedType, setSelectedType] = useState<SelectData>(
    convertForSelect(initialData.type)
  )

  useEffect(() => {
    // if (initialData.type === 'file' && initialData.file) {
    //   setFileGeneric(initialData.file);
    // }
    // if (initialData.type === 'image' && initialData.file) {
    //   setFileImage(initialData.file);
    // }
  }, [initialData])

  useEffect(() => {
    if (fileImage) {
      let previewList = ''
      setFilePreview('')

      // fileList.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        previewList = reader.result as string
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(fileImage)
      // });
      if (previewList) {
        setFilePreview(previewList)
      }
    } else {
      setFilePreview('')
    }
  }, [fileImage])

  const handleChangeValue = useCallback(e => {
    if (e) {
      setSelectedType(e)
    } else {
      setSelectedType({} as SelectData)
    }
    setFilePreview('')
    setAudioPreview('')
    // setFileList([]);
    setFileGeneric(undefined)
    setFileVideo(undefined)
    setSelectedAudio(undefined)
  }, [])

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true)

        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          time: Yup.string().required('Tempo obrigatório'),
          type: Yup.mixed().required('Tipo de mídea obrigatória')
        })

        if (data.type.value === 'text' && !data.text) {
          formRef.current?.setErrors({
            text: 'Mensagem obrigatória para mídeas do tipo texto.'
          })
          setLoading(false)
          return
        }
        await schema.validate(data, { abortEarly: false })

        if (initialData.id) {
          const formData = new FormData()
          formData.append('id', initialData.id)
          formData.append('type', data.type.value)
          if (data.text) {
            formData.append('text', data.text)
          }
          formData.append('time', data.time.toString())

          if (fileImage && data.type.value === 'image') {
            formData.append('file', fileImage)
          }
          if (fileGeneric && data.type.value === 'file') {
            formData.append('file', fileGeneric)
            formData.append('text', data.rename || 'arquivo')
          }
          if (fileVideo && data.type.value === 'video') {
            formData.append('file', fileVideo)
          }
          if (selectedAudio && data.type.value === 'audio') {
            formData.append('file', selectedAudio)
          }

          // await api.put('/post', formData, {
          //   headers: { 'Access-Control-Allow-Origin': '*' }
          // })

          setLoading(false)
          // formRef.current?.reset();
          if (typeof onReloadData === 'function') {
            onReloadData()
          }
          // getInitialData();
          setFilePreview('')
          setAudioPreview('')
          setFileImage(undefined)
          setFileGeneric(undefined)
          setFileVideo(undefined)
          setSelectedAudio(undefined)
          setSelectedType({} as SelectData)
          addToast({
            type: 'success',
            title: 'Sucessso',
            description: 'Post editado com sucesso.'
          })
        }
      } catch (err) {
        console.log(err)
        setLoading(false)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description: 'Houve um erro tentar criar script, tente novamente'
        })
      }
    },
    [
      addToast,
      fileImage,
      initialData,
      // scriptData,
      selectedAudio,
      fileVideo,
      fileGeneric,
      onReloadData
    ]
  )

  const handleRemoveImage = useCallback(() => {
    setFileImage(undefined)
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

  const handleChangeFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file: File = event.target.files[0]
        setFileGeneric(file)
      }
    },
    []
  )

  const handleChangeVideo = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file: File = event.target.files[0]
        setFileVideo(file)
      }
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
          setFileImage(listFile[0])
        }
      }
    },
    []
  )

  useEffect(() => {
    if (selectedAudio) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAudioPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedAudio)
    } else {
      setAudioPreview('')
    }
  }, [selectedAudio])

  const handleChangeAudio = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setSelectedAudio(event.target.files[0])
      }
    },
    []
  )

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
    <FormScrip
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={{
        // time: initialData.time,
        type: convertForSelect(initialData.type),
        text: initialData.text ? initialData.text : '',
        rename:
          initialData.type === 'file' && initialData.text
            ? initialData.text
            : ''
      }}
    >
      <div className="dobleLeft">
        <Select
          label="Tipo de mídea"
          name="type"
          required
          options={mediaType}
          onChange={e => handleChangeValue(e)}
          isClearable
        />
        {/* <Input
          label="Tempo para envio"
          name="time"
          required
          type="number"
          placeholder="Em segundos"
        /> */}
      </div>
      {selectedType.value === 'file' && (
        <div className="dobleLeft">
          <Input label="Renomar o arquivo" name="rename" />
        </div>
      )}
      {selectedType.value && (
        <>
          {selectedType.value === 'text' ? (
            <TextArea label="Mensagem" name="text" required />
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
                    <ButtonFile type="file" onChangeFile={handleChangeFile} />
                  )}
                </div>
              )}
              {selectedType.value === 'image' && (
                <div className="containerImage">
                  {filePreview ? (
                    <div className="selectedImage">
                      <img
                        src={filePreview}
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

      <div className="ButtonForm">
        <Button
          title="cancelar"
          type="button"
          className="cancel"
          onClick={onCancelEdit}
        />
        <Button title="Salvar" type="submit" loading={loading} />
      </div>
    </FormScrip>
  )
}

export default FormAddPost
FormAddPost.defaultProps = {
  onReloadData: () => {
    /* function */
  },
  onCancelEdit: () => {
    /* function */
  }
}

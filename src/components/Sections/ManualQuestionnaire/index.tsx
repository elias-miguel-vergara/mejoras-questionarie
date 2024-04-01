import { useContext, useState, useEffect } from 'react'
import {
  Button,
  TopicsContext,
  QuestionsContainer,
  QuestionnaireDescription,
} from '@/components'
import { capitalize } from '@/utils'

export const ManualQuestionnaire = () => {
  const { currentTopic, selectTopic, switchManualQuestionnaire } =
    useContext(TopicsContext)

  const [fileUploaded, setFileUploaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: any) => {
    setLoading(true);
    if (e.target.files.length) {
      const readFile = (file: File) => {
        const reader = new FileReader()
    
        reader.onload = (event) => {
          if (event?.target?.result) {
            const json = JSON.parse(event.target.result.toString())
            processJson(json);
          }
        }
    
        reader.readAsText(file);
      }
      readFile(e.target.files[0])
    }

    const processJson = (json: any) => {
      for (let topicName in json.skill) {
        if (json.skill[topicName].id) {
          localStorage.setItem('currentTopic', JSON.stringify(json.skill[topicName]));
          selectTopic!({
            current: json.skill[topicName],
            isManualQuestionnaire: true,
          });
          setFileUploaded(true)
          break
        }
      }
    }
  }

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    const storedTopic = localStorage.getItem('currentTopic');
    if (storedTopic) {
      selectTopic!({
        current: JSON.parse(storedTopic),
        isManualQuestionnaire: true,
      });
      setFileUploaded(true);
    }

    return () => {
      localStorage.removeItem('currentTopic');
    }
  }, []);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    localStorage.removeItem('currentTopic');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

    const renderLoadingIndicator = () => (
      <div className='flex justify-center items-center h-dvh relative'>
        <div className='animate-spin border-4 border-solid border-gray-900 border-t-transparent rounded-full w-40 h-40 static'></div>
        <div className='h-full flex justify-center items-center font-bold absolute'>Loading...</div>
      </div>
    );
    const renderReturnButton = () => (
      <div className='flex justify-end p-4'>
        <Button
          type="secondary"
          classes="max-w-[150px]"
          onClick={() => switchManualQuestionnaire!()}
        >
          Return
        </Button>
      </div>
    );
    const renderQuestionnaire = () => (
      <div className="flex w-full p-[20px] flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{capitalize(currentTopic!.id)}</h1>
          <Button
            type="secondary"
            classes="max-w-[150px] font-bold"
            onClick={() => switchManualQuestionnaire!()}
          >
            Return
          </Button>
        </div>
        {currentTopic?.startedQuestionnaire ? (
          <QuestionsContainer />
        ) : (
          <QuestionnaireDescription />
        )}
      </div>
    );
    const renderUploadForm = () => (
      <div className="flex p-6 flex-col items-center">
        <p className="text-2xl font-bold">
          Please upload a JSON file to start questionnaire
        </p>
        <input onChange={handleFileChange} className="mt-6" type="file" />
      </div>
    );
    return (
      <div className="flex w-full flex-col">
        {loading ? renderLoadingIndicator() : (
          <>
            {!fileUploaded && renderReturnButton()}
            {fileUploaded ? renderQuestionnaire() : renderUploadForm()}
          </>
        )}
      </div>
    );
  }
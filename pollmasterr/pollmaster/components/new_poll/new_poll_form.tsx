import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Select, { ActionMeta, SingleValue } from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { currentUserUsername } from "../../redux/slices/currentUserInfoSlice";
import styled from "styled-components";
import ErrorModal from "../utils/error_modal";
import SuccessModal from "../utils/success_modal";
import LoadingModal from "../utils/loading_modal";

import { addPollCreation } from "../../utils/users";

const durationOptions = [
  { value: "5 Minutos", label: "5 Minutos" },
  { value: "30 Minutos", label: "30 Minutos" },
  { value: "1 Hora", label: "1 Hora" },
  { value: "3 Horas", label: "3 Horas" },
  { value: "1 Dia", label: "1 Dia" },
  { value: "3 Dias", label: "3 Dias" },
  { value: "5 Dias", label: "5 Dias" },
];

const PollForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  gap: 25px;

  width: 100%;
  background-color: white;
  padding: 50px;

  border-radius: 10px;
`;

const AddResponseDiv = styled.div`
  display: flex;
  justify-content: center;

  > svg {
    background-color: #00e000;
    color: white;
    border-radius: 50%;

    padding: 10px;
    height: 20px;
    width: 20px;

    &:hover {
      background-color: #00af00;
    }
  }
`;

const RmResponseDiv = styled.div`
  > svg {
    background-color: red;
    color: white;
    border-radius: 50%;

    padding: 10px;
    height: 18px;
    width: 18px;

    &:hover {
      background-color: #970000;
    }
  }

  display: flex;
  justify-content: center;
  flex: 10%;
`;

const ResponseListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  padding-right: 0px;
`;

const ResponseDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;

  padding: 0.75rem 0.75rem;
  padding-right: 0px;
`;

const FileAndTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 90%;
`;

export default function NewPollForm() {
  const pollTitleInputRef = useRef<HTMLInputElement>(null);
  const [pollDurationSelectedOption, setPollDurationSelectedOption] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });

  const [possibleAnswersArray, setPossibleAnswersArray] = useState<
    Array<{ textValue: string; mediaValue: File }>
  >([]);

  const currentuserUsername = useSelector(currentUserUsername);

  const [titleError, setTitleError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreationEvent = async () => {
    const pollTitle = pollTitleInputRef.current
      ? pollTitleInputRef.current.value
      : "";

    if (pollTitle === "") {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (pollDurationSelectedOption.value === "") {
      setDurationError(true);
    } else {
      setDurationError(false);
    }

    if (pollTitle != "" && pollDurationSelectedOption.value != "") {
      let validAnswers: Array<{
        textValue: string;
        bits: string;
        total_bytes: number;
        media_type: string;
      }> = [];

      for (const element of possibleAnswersArray) {
        let validAnswer = {
          textValue: element.textValue,
          bits: "",
          total_bytes: 0,
          media_type: "",
        };

        if (element.mediaValue.name !== "") {
          // Encode media
          const bits = await element.mediaValue.arrayBuffer();
          const bits_b64 = Buffer.from(bits).toString("base64");
          validAnswer.bits = bits_b64;
          validAnswer.total_bytes = element.mediaValue.size;
          validAnswer.media_type = element.mediaValue.type;
        }
        if (validAnswer.textValue !== "" || validAnswer.bits !== "") {
          validAnswers = [...validAnswers, validAnswer];
        }
      }

      if (validAnswers.length > 1) {
        setFormError(false);
        const payload = {
          creatorUsername: currentuserUsername,
          title: pollTitle,
          duration: pollDurationSelectedOption.value,
          answers: validAnswers,
        };

        setIsLoading(true);
        let response = await fetch("/api/twitter/create_poll", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setIsLoading(false);

        if (response.status !== 200) {
          // An error occured
          setErrorMessage(
            "Aconteceu um erro ao criar a poll. Por favor tente novamente."
          );
        } else {
          // Poll created with success
          addPollCreation(currentuserUsername);
          setSuccessMessage("A sua Poll foi criada com sucesso!");
        }
      } else {
        // Invalid Poll
        setFormError(true);
        return;
      }
    }
  };

  const createNewAnswer = () => {
    if (possibleAnswersArray.length >= 5) {
      return;
    }

    const newAnswerArray = [
      ...possibleAnswersArray,
      { textValue: "", mediaValue: new File([], "") },
    ];
    setPossibleAnswersArray(newAnswerArray);
  };

  const changeAnswer = (
    changeType: string,
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newAnswer = { textValue: "", mediaValue: new File([], "") };
    if (changeType == "text") {
      newAnswer = {
        textValue: event.target.value,
        mediaValue: possibleAnswersArray[index].mediaValue,
      };
    } else if (changeType == "media") {
      if (event.target.files)
        newAnswer = {
          textValue: possibleAnswersArray[index].textValue,
          mediaValue: event.target.files[0],
        };
    }
    let newAnswerArray = [...possibleAnswersArray];
    newAnswerArray[index] = newAnswer;
    setPossibleAnswersArray(newAnswerArray);
  };

  const deleteAnswer = (index: number) => {
    let newAnswerArray = [...possibleAnswersArray];
    newAnswerArray.splice(index, 1);
    setPossibleAnswersArray(newAnswerArray);
  };
  return (
    <>
      <PollForm
        onSubmit={(event) => {
          event.preventDefault();
          handleCreationEvent();
        }}
      >
        <h2 style={{ textAlign: "center" }}>Formulário Criação Nova Poll</h2>
        <div>
          <input
            type="text"
            className={`form-control ${titleError && "is-invalid"}`}
            id="pollTitleInput"
            placeholder="Inserir Título da Poll"
            ref={pollTitleInputRef}
          />
        </div>
        <div>
          <Select
            id="pollDurationInput"
            instanceId="pollDurationInput"
            className={`${durationError && "form-control is-invalid"}`}
            options={durationOptions}
            onChange={(choice: SingleValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>) => {
              if (choice) {
                let choice_converted = {label: choice.label, value: choice.value}
                setPollDurationSelectedOption(choice_converted)
              }
            }}
            placeholder="Selecione a Duração da Poll"
            isSearchable={false}
          />
        </div>
        <ResponseListDiv>
          {possibleAnswersArray.map(function (
            element: { textValue: string; mediaValue: File },
            index
          ) {
            return (
              <ResponseDiv key={index} className="form-control">
                <FileAndTextDiv>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inserir Possível Resposta"
                    value={element.textValue}
                    onChange={(event) => changeAnswer("text", event, index)}
                  />

                  <hr />

                  <label htmlFor={"customFile" + index}>Opcional</label>
                  <input
                    type="file"
                    className="form-control"
                    id={"customFile" + index}
                    onChange={(event) => changeAnswer("media", event, index)}
                  />
                </FileAndTextDiv>

                <RmResponseDiv>
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => deleteAnswer(index)}
                  />
                </RmResponseDiv>
              </ResponseDiv>
            );
          })}

          <AddResponseDiv>
            <FontAwesomeIcon icon={faPlus} onClick={() => createNewAnswer()} />
          </AddResponseDiv>
        </ResponseListDiv>

        {formError && (
          <div className="alert alert-danger" role="alert">
            Adiciona pelo menos duas resposta à poll
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Criar
        </button>
      </PollForm>
      <ErrorModal
        show={errorMessage !== ""}
        onHide={() => setErrorMessage("")}
        message={errorMessage}
      />
      <SuccessModal
        show={successMessage !== ""}
        onHide={() => setSuccessMessage("")}
        message={successMessage}
      />
      {isLoading && <LoadingModal />}
    </>
  );
}

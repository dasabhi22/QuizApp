import SetupForm from "./Form/SetupForm";
import Loading from "./Loading/LoadingScreen";
import Modal from "./Modal/Modal";
import { useGlobalContext } from "./Context/Context";

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestions,
    checkAnswers,
  } = useGlobalContext();
  if(waiting){
    return(
      <SetupForm />
    )
  }
  if(loading){
    return(
      <Loading />
    )
  }

  const {incorrect_answers, correct_answer, question} = questions[index]
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random()*4)
  if(tempIndex === 3){
    answers.push(correct_answer)
  }else{
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">correct answers: {correct}/{index}</p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{__html: question}}/>
          <div className="btn-container">
            {answers.map((answer,index)=>{
              return(
                <button key={index} className="answer-btn" onClick={()=>checkAnswers(correct_answer === answer)} dangerouslySetInnerHTML={{__html:answer}}></button>
              )
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestions}>next question</button>
      </section>
    </main>
  );
}
export default App;

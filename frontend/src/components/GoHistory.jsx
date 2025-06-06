import { useNavigate } from 'react-router-dom';
import Logo from './modules/Logo';

function GoHistory({ value, onChange}) {
  const navigate = useNavigate()
  const handleclick = () => {
    navigate('/');
  }

  const handleNext = () => {
    value = 2;
    onChange(value);
  }

  return (
    <section className="history">
        <img src="/img/historyImg.jpg" alt="image" className='section-img'/>
        <Logo/>
        <div className="section-h2">Начало моей истории</div>
        <div className="darkFon">
          На Земле надвигалась катастрофа, и, возможно, она уже началась. В панике, как и большинство людей, я искал укрытие, чтобы спасти свою жизнь. Каждый шаг был полон опасности, и в сердце моем росло чувство безысходности. Вдруг я заметил группу людей вдалеке. Страх сковывал меня: подойти к ним или остаться в одиночестве? Но терять было нечего, и я решился.
          <br />
          <br />
          С каждым шагом к ним сердце колотилось все сильнее. И вот, когда я приблизился, меня охватило чувство невероятного везения — они стояли у входа в бункер, последнюю надежду на спасение! Эти люди, как и я, искали выживших, и вокруг них был разбит временный лагерь. Они встретили меня с открытыми руками, но в воздухе витала напряженность: кто-то должен был решить, кто достоин попасть внутрь, а кто — обречен на гибель.
          <br />
          <br />
          Вскоре все собрались в круг, и началось обсуждение. Я знал, что не идеальный кандитат на “выживание”. От этого мне становилось всё страшнее и страшнее...
        </div>

        <button onClick={handleclick} className="return">
            <img src="/img/return.svg" alt="return" />
        </button>

        <button onClick={handleNext} className="next">
            <img src="/img/arrow.svg" alt="next" />
        </button>
    </section>
  );
}

export default GoHistory;
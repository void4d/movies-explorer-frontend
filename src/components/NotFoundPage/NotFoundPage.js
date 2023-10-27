import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__code">404</h1>
      <p className="not-found-page__message">Страница не найдена</p>

      <p className="not-found-page__go-back" onClick={goBack}>
        Назад
      </p>
    </div>
  );
}

export default NotFoundPage;

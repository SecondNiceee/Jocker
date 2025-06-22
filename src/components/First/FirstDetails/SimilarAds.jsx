import FirstBlock from "../FirstMain/FirstBlock";


const SimilarAds = ({similarAds}) => {
  return (
    <div className="similarAds">
      {/* <h2>Похожие объявления</h2> */}
      <div className="similarAds__contaier">
        {similarAds.map((e) => {
          return <FirstBlock {...e} />;
        })}
      </div>
    </div>
  );
};

export default SimilarAds;

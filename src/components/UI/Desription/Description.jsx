import TextAboutMe from "../AboutMeText/TextAboutMe";

const Description = ({nonText, text, classNames}) => {
    return (
        <div className={`flex flex-col gap-[7.33px] w-full ${classNames}`}>
            <p className='greyTitle'>ОПИСАНИЕ</p>
            <TextAboutMe emptyText={nonText} aboutU={text} />
        </div>
    );
};

export default Description;
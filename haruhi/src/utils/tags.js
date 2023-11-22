import { ko_tag } from "./ko";
import '../css/tag.css';

const HostURL = "https://hitomi.la"

export function TagBox( {tag_data, tag_name}) {
    if (tag_data.female == "1") {
        return (
            <a href={HostURL + tag_data.url}><div className="female_tag"><b>{TagTrans(tag_data[tag_name])}</b></div></a>
        )
    } else if (tag_data.male == "1") {
        return (
            <a href={HostURL + tag_data.url}><div className="male_tag"><b>{TagTrans(tag_data[tag_name])}</b></div></a>
        )
    } else {
        return (
            <a href={HostURL + tag_data.url}><div className="_tag"><b>{TagTrans(tag_data[tag_name])}</b></div></a>
        )
    }
    
}

export const TagTrans = (tag) => {
    if (ko_tag[tag] == null) {
        return tag
    } else {
        return (ko_tag[tag])
    }
    
}
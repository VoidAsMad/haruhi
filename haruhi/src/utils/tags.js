import { ko_tag } from "./ko";
import '../css/tag.css';

const HostURL = "https://hitomi.la"

export function TagBox( {tag_data, tag_name}) {
    if (tag_data.female == "1") {
        return (
            <a href={HostURL + tag_data.url}><div className="female_tag">{TagTrans(tag_data[tag_name])}</div></a>
        )
    } else {
        return (
            <a href={HostURL + tag_data.url}><div className="male_tag">{TagTrans(tag_data[tag_name])}</div></a>
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
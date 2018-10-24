import {Uneditable} from '../../../field-rat-basic-fields'
import Url from './fields/Url'
import Image from './fields/Image'
import RichEdit from './fields/RichEdit'

export {Url, Image, RichEdit}
export const fieldComponents = {
    url: Url,
    image: Image,
    richEdit: RichEdit,
    'id-string': Uneditable,
    'zrcms-service': Uneditable,
};

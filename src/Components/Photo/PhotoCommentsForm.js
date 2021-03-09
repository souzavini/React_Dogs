import React from 'react';
import { COMMENT_POST } from '../../api';
import {ReactComponent as Enviar} from '../../Assets/enviar.svg';
import Error from '../Helper/Error';
import useFetch from '../Hooks/UseFetch';
import styles from './PhotoCommentsForm.module.css';;


const PhotoCommentsForm = ({id, setComments,single}) => {
const {request,error} = useFetch();
const [comment,SetComment] = React.useState('');

async function HandleSubmit(event){
    event.preventDefault();
    const {url,options} = COMMENT_POST(id,{comment});
    const {response,json} = await request(url,options);

    if(response.ok){
        SetComment('');
        setComments((comments) => [...comments,json])
    }
}

    return (
        <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={HandleSubmit}>
            <textarea 
            className={styles.textarea}
            id="comment"
            name="comment"
            placeholder="Comente ..."
            value={comment} 
            onChange={({target}) => SetComment(target.value) }/>
            <button className={styles.button}><Enviar/></button>
            <Error error={error}/>
        </form>
    )
}

export default PhotoCommentsForm

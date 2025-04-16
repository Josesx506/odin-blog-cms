import styles from "@/styles/buttons.module.css";
import { ListTodo, MessageSquare, SquarePen, Trash2 } from 'lucide-react';
import Link from 'next/link';

function ContainedButton({ children, onClick=()=>{}, color="black", backgroundColor="lightgray", disabled=false }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={styles.contained}
      style={{color:color, 
      backgroundColor: backgroundColor}}
      >
      {children}
    </button>
  )
}

export default function BigButton({ color="black", backgroundColor="lightgray", onClick, children }) {
  return (
    <button 
    className={styles.big} 
    style={{color:color, 
    backgroundColor: backgroundColor}} 
    onClick={onClick} 
    >
      {children}
    </button>
  )
}


function ViewCommentsBtn({numComments, className='', href='#'}) {
  return (
    <Link className={className} href={href}>
        <MessageSquare strokeWidth={"1.2px"} size={"1em"} fill='lightgray' />
        <div>{numComments}</div>
    </Link>
  )
}

function EditContentBtn({onClick=()=>{}, published=false, className=''}) {
    return (
      <button className={className} onClick={onClick}>
        {
          published ? 
          <SquarePen color='rgb(85, 200, 39)' strokeWidth={"2px"} size={"1.2em"} /> :
          <ListTodo color='rgb(39,100,200)' strokeWidth={"1.5px"} size={"1.2em"} /> 
        }
      </button>
    )
}

function DeleteContentBtn({onClick=()=>{}, className=''}) {
    return (
      <button className={className} onClick={onClick}>
          <Trash2 color='tomato' strokeWidth={"2px"} size={"1.2em"} />
      </button>
    )
}

export { BigButton, ContainedButton, DeleteContentBtn, EditContentBtn, ViewCommentsBtn };


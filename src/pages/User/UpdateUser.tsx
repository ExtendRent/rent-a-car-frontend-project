import React from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

const UpdateUser = (props: Props) => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id ?? "", 10);
  return (
    <div>UpdateUser</div>
  )
}

export default UpdateUser
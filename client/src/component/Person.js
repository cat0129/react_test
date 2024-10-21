import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Typography, Paper, IconButton } from '@mui/material';


const Person = ()=>{
    const [person, setPerson] = useState([]);
    async function fnList() {
        try{
            const res = await axios.get('http://localhost:3100/person');
            if(res.data.success){
                setPerson(res.data.list);
            } else{
                console.log("에러");
            }
        } catch(err) {
            console.log("에러");
        }
    };
    useEffect(()=>{
        fnList();
    }, []);

    async function fnDelete(id){
        if(!window.confirm("삭제하시겠습니까?")){
            return;
        };
        const res = await axios.delete(`http://localhost:3100/person/${id}`);
        if(res.data.success){
            alert("삭제되었습니다");
            fnList();
        } else {
            alert("오류발생");
        }   
    };

    async function fnUpdate(id, gender) {
        const res = await axios.put(`http://localhost:3100/person/${id}`, {gender:gender});
        if(res.data.success){
            alert("수정되었습니다");
            fnList();
        } else{
            alert("오류발생");
        }
    }

    return (
        <Box>
            {person.length > 0 ? (
                person.map((p) => (
                    <Paper key={p.id} style={{ padding: 16, marginBottom: 16 }}>
                        <Typography variant="h6">{p.id}</Typography>
                        <Typography variant="h6">{p.name}</Typography>
                        <Typography variant="h6">{p.gender}</Typography>
                        <Typography variant="h6">{p.phone}</Typography>
                        <Typography variant="h6">{p.addr}</Typography>
                    </Paper>
                ))
            ) : (
                <Typography variant="h6">데이터가 없습니다.</Typography>
            )}
        </Box>
    );
    
};    

export default Person; 
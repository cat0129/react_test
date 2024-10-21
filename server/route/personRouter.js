const express = require('express');
const cors = require('cors');
const router = express.Router();
const connection = require('../db');

router.route("/")
    .get((req,res)=>{
        const query = 'SELECT * FROM TBL_PERSON';
        connection.query(query, (err,results)=>{
            if(err){
                console.log('쿼리 실행 실패', err);
                return;
            }
            res.json({ success: true, list: results });
        })
    })
    .post((req,res)=>{
        const query = 'INSERT INTO TBL_PERSON (ID, NAME) VALUES (?, ?)';
        connection.query(query, (err,results)=>{
            if(err){
                return res.json({success:false, message:"db오류"});
            }
            res.json({success:true, message:"가입성공"});
        })
    })

router.route("/:id")
    .delete((req,res)=>{
        const id = req.params.id;
        const query = 'DELETE FROM TBL_PERSON WHERE ID=?';
        connection.query(query, [id], (err,result)=>{
            if(err){
                return res.json({success:false, message:"db오류"});
            }
            res.json({success:true, message:"삭제됨"});
        })
    })    
    .put((req,res)=>{
        const id = req.params.id;
        const gender = req.body.gender; 
        const query = 'UPDATE TBL_PERSON SET gender=? WHERE ID=?';
        connection.query(query, [gender, id], (err,result)=>{ 
            if(err){
                return res.json({success:false, message:"db오류"});
            }
            res.json({success:true, message:"수정됨"});
        });
    });  

module.exports = router;    
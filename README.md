# Todo API

## Overview

CRUD ของรายการ Todo:
- สร้าง
- อ่านทั้งหมด / อ่านตาม id
- แก้ไข
- ลบ

---

## Base URL

```text
http://localhost:3000
```

---

# Endpoints

## Create a Todo
สร้างรายการใหม่

Method: POST

Endpoint: /todos

Request Body (JSON):

{
  "title": "test"
}

Result
{
  "id": 1,
  "title": "test",
  "is_completed": false
}

---

## Get All Todos
ดึงรายการทั้งหมด

Method: GET

Endpoint: /todos

Request Body: ไม่มี

Result
[
  {
    "id": 1,
    "title": "test",
    "is_completed": false
  },
  {
    "id": 2,
    "title": "test002",
    "is_completed": true
  }
]

---

## Get a Single Todo
ดึงรายการเดียวด้วย id

Method: GET

Endpoint: /todos/:id

Request Body: ไม่มี

Result
{
  "id": 1,
  "title": "test",
  "is_completed": false
}

---

## Update a Todo
อัปเดตรายการด้วย id

Method: PUT

Endpoint: /todos/:id

Request Body (JSON):

{
  "title": "test001",
  "is_completed": true
}

Result
{
  "id": 1,
  "title": "test001",
  "is_completed": true
}

---

## Delete a Todo
ลบรายการด้วย id

Method: DELETE

Endpoint: /todos/:id

Request Body: ไม่มี

---

ใช้ gitlab.psu.ac.th
สร้าง repo ชื่อ book-store

STEP 1:
* Backend
- สร้าง api สำหรับการให้ข้อมูล category โดย mock ข้อมูลใน code (ยังไม่มีการเชื่อมต่อฐานข้อมูล)
- ปรับ api ให้เชื่อมโยงกับฐานข้อมูล mysql
** หารายละเอียดเพิ่มเติมเกี่ยวกับ knexStringcase
* Frontend
- สร้าง Category Repo ที่มีเพียง method เดียวคือ getAll โดยให้ mock ข้อมูลใน code
- นำชื่อ category ทั้งหมด มาแสดงผล 
- เติม Category Repo ให้มี method ครบทั้ง 5 method
- ทำการปรับให้เรียกใช้ข้อมูลจาก backend

STEP 2:
* Backend
- สร้าง api สำหรับการให้ข้อมูล book (โดยยังรองรับ nested object)
- เพิ่มการรองรับ nested object
* Forntend
- สร้าง Book Repo ที่มีเพียง method เดียวคือ getAll โดยให้ mock ข้อมูลใน code 
- สร้าง component BookDetial เพื่อใช้แสดงรายละเอียดหนังสือ
- ใช้ compnent BookDetail ในการแสดงรายละเอียดหนังสือ จากเมธอด getAll ที่ mock ไว้
- เติม Book Repo ให้มี method ครบทั้ง 5 method
- ทำการปรับให้เรียกใช้ข้อมูลจาก backend

STEP 3:
* Frontend
- ปรับโค้ดเพื่อให้สามารถกรองรายการหนังสือจาก category ได้

STEP 4:
* Frontend
- สร้าง BookForm สำหรับการใช้สำหรับการแสดงข้อมูลหนังสือ (ยังไม่ต้องมี callBackFn และโค้ดเกี่ยวกับ submit)
- เติม callBackFn และส่วนทีเกี่ยวข้องกับการ submit
** ให้ตรวจสอบว่า ชื่อหนังสือจะต้องมีความยาวมากกว่า 5 ตัวอักษร ไม่เช่นนั้นจะไม่อนุญาตให้สร้างหนังสือ (การแจ้งเตือนให้ผู้ใช้ทราบ ทำตามความเหมาะสม)

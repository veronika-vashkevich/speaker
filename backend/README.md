1. APP_PASS is the password for encryption
2. Online decr-encr
https://www.devglan.com/online-tools/jasypt-online-encryption-decryption


In frontend add <Contact/>:
TODO

1. to BeginnerCoursePage
 <div className='Home'>
                        <CourseHeader className="Course-Header" selectedCourse={this.state.selectedCourse}/>
                        <Course
                            classNameValue={`${this.state.selectedCourse === 'beginner' ? 'gallery-courses active' : 'gallery'}`}
                            imgSrc={beginner}
                            desc1="Курс НАЧИНАЮЩИЕ (дети) "
                            desc2="6-13 лет"
                            courseName="'НАЧИНАЮЩИЕ'"
                            selectedCourse="beginner"
                            lessons={this.state.lessons}
                            description= {BEGINNER_DESCRIPTION}
                            // onClicked={this.imageBeginnerClick}
                        />
                     here  /* <Contact/>*/
                    </div>
                    <div style={{position: "relative", margin: " 5% auto", alignItems: "center"}}>
                        <Footer />
                    </div>
                    
2. ContinueCoursePage - same change
3. AdultCoursePage - same change
4. AdvancedCoursePage - same change

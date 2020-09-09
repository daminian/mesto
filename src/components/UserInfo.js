export class UserInfo {
    constructor(userName, userJob) {
        this._userName = userName
        this._userJob = userJob
    }

    getUserInfo() {
        const authorInfo = {
            name: this._userName.textContent,
            job: this._userJob.textContent
        }

        return authorInfo;
    }
    setUserInfo(formData) {
        this._userName.textContent = formData.name.value
        this._userJob.textContent = formData.job.value
    }
}
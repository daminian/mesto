export class UserInfo {
    constructor(userName, userJob, userAvatar) {
        this._userName = userName
        this._userJob = userJob
        this._userAvatar = userAvatar
    }

    getUserInfo() {
        const authorInfo = {
            name: this._userName,
            job: this._userJob,
            avatar: this._userAvatar
        }

        return authorInfo;
    }
    setUserInfo(formData) {
        this._userName.textContent = formData.name
        this._userJob.textContent = formData.about
        this._userAvatar.src = formData.avatar;
    }
}
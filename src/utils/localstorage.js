    const createLocalStorage = (key, value) => {
        /**
         * Eğer kullanıcı json formatında bir veri eklemezse bunu normal bir string olarak tutmalıyız
         */
        const data = JSON.stringify(value)
        localStorage.setItem(key, data)
    }


    const getLocalStorage = (key) => {
        /**
         * böyle bir storage hiç oluşmamış olabilir bu durumda sizin boş string | false ("") dönmeniz gerekir
         * uygun formatta olmayabilir bu durumda boş string ve ya false dönebilirsiniz
         * 
         */
       const data =  JSON.parse(localStorage.getItem(key))
 
       return data;
    }

    const removeLocalStorage = (key) => {
        // varlığını kontrol et varsa sil yoksa hiç birşey yapma
        localStorage.removeItem(key)
    }


    const allRemoveLocalStorage = () => {
        /**
         * Localstorage sayısı 0 dan büyükse clear yap 
         */
        localStorage.clear()
        console.log('removed all localstorage')
    }


    export {
        createLocalStorage,
        getLocalStorage,
        removeLocalStorage,
        allRemoveLocalStorage
    }
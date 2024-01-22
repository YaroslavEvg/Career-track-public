function atm(sum) {
    const banknotes = [90, 60, 1];
    // const banknotes = [3, 5];
    resArray = Array()
    resObject = Object()

    // подсчет количество банкнот для каждой суммы
    let F = Array(sum + 1).fill(Infinity)
    F[0] = 0
    for (let k = 1; k <= sum; k++) {
        for (let i = 0; i < banknotes.length; i++) {
            if (k - banknotes[i] >= 0 && F[k - banknotes[i]] < F[k])
                F[k] = F[k - banknotes[i]]
        }
        F[k] += 1
    }

    // Восстановление ответа по купюрам
    let k = sum
    while (k != 0) {
        let incorrect = k
        for (let i = 0; i < banknotes.length; i++) {
            if (k - banknotes[i] >= 0 && F[k] === F[k - banknotes[i]] + 1) {
                resArray.push(banknotes[i])
                k -= banknotes[i]
            }
        }
        if (incorrect === k) {
            console.error('Incorrect value')
            return
        }
    }

    // Создание объекта из массива
    for (let i = 0; i < resArray.length; i++) {
        if (resObject[resArray[i]])
            resObject[resArray[i]] += 1
        else
            resObject[resArray[i]] = 1
    }

    // Проверка на Limit exceeded
    let values = Object.values(resObject)
    let count = values.reduce(function (prev, current) {
        return prev + current
    })
    if (count > 20) {
        console.error('Limit exceeded')
        return
    }

    return resObject
}

console.log(atm(100));

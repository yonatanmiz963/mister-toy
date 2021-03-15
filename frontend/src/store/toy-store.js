import { toyService } from '../services/toy.service.js'
import { userService } from '../services/user.service.js'

export const toyStore = {
    state: {
        toys: null,
        filterBy: {
            searchStr: '',
            status: 'All',
            type: undefined,
            sortBy: 'Name'
        },
        pageSize: 4,
        pageIdx: 0,
        isChatOpen: false
    },
    getters: {
        isChatOpen(state) {
            return state.isChatOpen
        },
        toysForDisplay(state) {
            if (!state.toys) return
            const startIdx = state.pageIdx * state.pageSize;
            const toys = state.toys.slice(startIdx, startIdx + state.pageSize)
            return toys
        },
        sumToysByType(state) {
            if (!state.toys) return
            var typesSum = state.toys.reduce((acc, toy) => {
                if (!acc[toy.type]) acc[toy.type] = 1
                acc[toy.type]++
                return acc
            }, {})
            return typesSum
        },
        getToysAvgPrice(state) {
            if (!state.toys) return
            var toysPriceAvgs = state.toys.reduce(
                (acc, toy) => {
                    if (!acc[toy.type]) acc[toy.type] = [];
                    acc[toy.type].push(toy.price);
                    return acc;
                },
                {}
            );
            for (const type in toysPriceAvgs) {
                let typePrices = toysPriceAvgs[type];
                var pricesSum = typePrices.reduce((acc, price) => {
                    return acc + price;
                }, 0);
                toysPriceAvgs[type] = pricesSum / typePrices.length;
            }
            return toysPriceAvgs
        },
    },
    mutations: {
        openChat(state) {
            state.isChatOpen = true
        },
        closeChat(state) {
            state.isChatOpen = false
        },
        setToys(state, { toys }) {
            state.toys = toys
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(toy => toy._id === toyId)
            state.toys.splice(idx, 1)
        },
        setToy(state, { savedToy }) {
            const idx = state.toys.findIndex(toy => toy._id === savedToy._id)
            if (idx === -1) {
                state.toys.unshift(savedToy)
            } else {
                state.toys.splice(idx, 1, savedToy)
            }
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy

        },
        setPage(state, { pageIdx }) {
            console.log('pageIdx:', pageIdx)
            state.pageIdx = pageIdx
        },
    },
    actions: {
        loadToys(context) {
            return toyService.query(context.state.filterBy)
                .then(toys => {
                    console.log('toys:', toys)
                    context.commit({ type: 'setToys', toys })
                })
                .catch(err => {
                    console.log('Store: Cannot load toys', err);
                    throw new Error('Cannot load Toys');
                })
        },
        async removeToy(context, payload) {
            try {
                await toyService.remove(payload.toyId)
                context.commit(payload)
                return payload
            } catch (err) {
                console.log('Store: Cannot remove toy', err);
                throw new Error('Cannot remove toy');
            }
        },
        setToy(context, { savedToy }) {
            return toyService.save(savedToy)
                .then(savedToy => {
                    context.commit({ type: 'setToy', savedToy })
                    return savedToy
                })
                .catch(err => {
                    console.log('Store: Cannot save toy', err);
                    throw new Error('Cannot save toy');
                })
        },
        getToy(context, { toyId }) {
            return toyService.getById(toyId)
        },
        async saveMsg(context, { toyId, msg }) {
            try {
                const toy = await toyService.addMsg(toyId, msg)
                console.log('toy:', toy)
            } catch (err) {
                console.log('err:', err)
            }
        },
    }
}
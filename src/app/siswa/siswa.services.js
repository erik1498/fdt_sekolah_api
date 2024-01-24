import { LOGGER, logType } from "../../utils/loggerUtil.js"
import { generatePaginationResponse } from "../../utils/paginationUtil.js"
import { createSiswaRepo, deleteSiswaByUuidRepo, getAllSiswaRepo, getSiswaByUuidRepo, updateSiswaByUuidRepo } from "./siswa.repository.js"

export const getAllSiswaService = async (query, req_id) => {
    LOGGER(logType.INFO, "Start getAllSiswaService", null, req_id)

    let {page, size, search} = query
    page = page ? page : null
    size = size ? size : null
    search = search ? search : ""
    page = page ? page : null
    size = size ? size : null
    if (size == "all") {
        page = null
        size = null
    }
    const pageNumber = (page - 1) * size
    
    LOGGER(logType.INFO, "Pagination", {
        pageNumber, size, search
    }, req_id)
    
    const siswas = await getAllSiswaRepo(pageNumber, size, search)
    return generatePaginationResponse(siswas.entry, siswas.count, siswas.pageNumber, siswas.size)
}

export const getSiswaByUuidService = async (uuid, req_id) => {
    LOGGER(logType.INFO, `Start getSiswaByUuidService [${uuid}]`, null, req_id)
    const siswa = await getSiswaByUuidRepo(uuid)

    if (!siswa) {
        throw Error("data not found")
    }
    return siswa
}

export const createSiswaService = async (siswaData, req_id) => {
    LOGGER(logType.INFO, `Start createSiswaService`, siswaData, req_id)
    const siswa = await createSiswaRepo(siswaData)
    return siswa
}

export const deleteSiswaByUuidService = async (uuid, req_id) => {
    LOGGER(logType.INFO, `Start deleteSiswaByUuidService [${uuid}]`, null, req_id)
    await getSiswaByUuidService(uuid)
    await deleteSiswaByUuidRepo(uuid)
    return true
}

export const updateSiswaByUuidService = async (uuid, siswaData, req_id) => {
    LOGGER(logType.INFO, `Start updateSiswaByUuidService [${uuid}]`, siswaData, req_id)
    await getSiswaByUuidService(uuid)
    const siswa = await updateSiswaByUuidRepo(uuid, siswaData)
    return siswa
}
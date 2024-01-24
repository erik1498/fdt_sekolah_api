import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import SiswaModel from "./siswa.model.js";

export const getAllSiswaRepo = async (pageNumber, size, search) => {
    const siswasCount = await db.query(
        `
            SELECT COUNT(0) AS count FROM siswa_tab WHERE name_siswa LIKE '%${search}%'
        `,
        { type: Sequelize.QueryTypes.SELECT }
    )

    pageNumber = pageNumber && pageNumber > -1 ? pageNumber : 0
    size = size ? size : siswasCount[0].count

    const siswas = await db.query(
        `
            SELECT * FROM siswa_tab WHERE name_siswa LIKE '%${search}%' LIMIT ${pageNumber}, ${size}
        `,
        { type: Sequelize.QueryTypes.SELECT }
    )

    return {
        entry: siswas,
        count: siswasCount[0].count,
        pageNumber: pageNumber == 0 ? pageNumber + 1 : (pageNumber / size) + 1,
        size
    }
}

export const getSiswaByUuidRepo = async (uuid) => {
    const siswa = await SiswaModel.findOne({
        where:{
            uuid
        }
    })
    return siswa
}

export const createSiswaRepo = async (siswaData) => {
    const siswa = await SiswaModel.create({
        name_siswa: siswaData.name_siswa,
        nisn_siswa: siswaData.nisn_siswa,
        jenis_kelamin: siswaData.jenis_kelamin,
        tempat_lahir: siswaData.tempat_lahir,
        tanggal_lahir: siswaData.tanggal_lahir,
        agama: siswaData.agama,
        nomor_induk_kependudukan: siswaData.nomor_induk_kependudukan,
        nomor_induk_sekolah: siswaData.nomor_induk_sekolah,
    })
    return siswa
}

export const deleteSiswaByUuidRepo = async (uuid) => {
    await SiswaModel.destroy({
        where:{
            uuid
        }
    })
}

export const updateSiswaByUuidRepo = async (uuid, siswaData) => {
    const siswa = await SiswaModel.update({
        name_siswa: siswaData.name_siswa,
        nisn_siswa: siswaData.nisn_siswa,
        jenis_kelamin: siswaData.jenis_kelamin,
        tempat_lahir: siswaData.tempat_lahir,
        tanggal_lahir: siswaData.tanggal_lahir,
        agama: siswaData.agama,
        nomor_induk_kependudukan: siswaData.nomor_induk_kependudukan,
        nomor_induk_sekolah: siswaData.nomor_induk_sekolah,
    }, {
        where: {
            uuid
        }
    })
    return siswa
}
import * as yup from 'yup'
import { Instrument, ResponseGetListApi } from '../../../types/facility.type'

export const createRoomSchema = (
  instrumentOptions: ResponseGetListApi<Instrument> | undefined,
) =>
  yup.object().shape({
    roomInstruments: yup.array().of(
      yup.object().shape({
        instrumentId: yup.number().required('Vui lòng nhập dụng cụ'),
        quantity: yup
          .number()
          .min(1, 'Số lượng phải lớn hơn 0')
          .required('Vui lòng chọn số lượng')
          .test('max', 'Vượt quá số lượng trong kho', function (value) {
            const { instrumentId } = this.parent
            const instrument = instrumentOptions?.data.find(
              (inst) => inst.id === instrumentId,
            )
            return instrument ? value <= instrument.countInStock : true
          }),
      }),
    ),
  })

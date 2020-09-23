import React from 'react'

// @TODO remove props
interface Props {
  className?: string
  size?: number | string
}

const IconCheckCircle: React.FC<Props> = ({ className }) => {
  return (
    <img
      className={className}
      width="12"
      height="12"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAEm0lEQVRYR82Yf0yUdRzH35/nuDtA7o67EzBEQNIcAwck4iJpa3PIcrNVipWH/VGj2qrp1mDkGrhmpv9o0z/C1VbgMmfmmtEi+4P+iEGydVdzBbo4ZpGg/JIDvTue59O+hwf3A7iH62z3/PP88Xy/n8/r+fz+fgkqH2Ym26Fug+RKsrIWGyHzDhCKGMglRqoQw4RxApxgOKChNvLiNyXl7siZxi2TRMRqVJGaRbvre0yJiuYZhbgKkDYDnANAE2GvDNAAoFyRmL67J8kXzx8tnYikb0kgYZV9Bx2VLPMhZhQASIkkcJHvLiJcJQ01thwu+n4pay0K9PKBqxa31lungPcToI8SJGgbA24JdELv1R775HjB6EIyFwTa12B/RGFuYgXPAdDFAiZAhockXJCImlqOFPeFyg4DEjCywmfAKAWgKsaiAGYQejQS2UKhghT63KT3nGIFzz9AGD8/k4Qv9G7dG4HumwMSAVxT7zjC4AMPwE2LGdFDoOOtR4sa/IE+B1Tzjn27PMNfxyqA1bpRBLomgZ5ufb+4XezxAYk6o4emnRlb1AqK5ToidLshbxd1iny1ps7+kkI4+R/qzLL40sw63B73gOdrt0tivNlyrPgz2tvUZcS07jRAe5YlNYrFiXoJleVp2FRgROOpayES+BySPbVU87ZjrSLxDwDnRaFD1RYBUrjOgJqdq2FN1WFgcBoHPwwtQfSnpNA2sjU4drKsfKWiN6lSHrrooTQ9nqpIR3mJGXqd5Pvc2+/Cex9dD10qk0Z6lmx19mYG10alLcKmvKxkvP5CNjIsekjSfMnr/2sa754MK9Ig0Gmy1du7mDmm2SWUF20w4JVda2BK0YZhj014sP+D3yErwRMJEXXT3nr7TTBnxNJCZRtT8eKOTKw0L9wGRXYdbr6OP/pdwWqJhoTL7jE4Jt1cSC/JN+LV6hykJIePSwozrg1M4ZuOYfQ5pzB1Vw4CIpB7WUAiW1am6pC7Ogm/9k3ijmtmTiARsC57Bd6y5cJsDHaTLDOGR9241DGMzl/GMCMvPDz6gNS4zJSSgML1BhRtMPre4u/bf7qFz9sG54qbxaTFa3uykZ9ngIDzP8IKHT+P4HLnLdwe9y4dGT6XLRHUqUYtniyzorzY7PtrYSH/451hfHrxBn7smZ2zandnY+uj5qBsGp/0ovncAHqd0/B4lYhh6gvqxdJeZGlxvgm7KlchMz0RCZrw0Wh0woMTLU5kZSSitjp7TqGiMHqdU/j4yxsYGnFHBPEvmE37CIVRWObxEjMqNll8YIHuENnS53Qh3aKH2TQfN12OMZxv/wdDIx7VMABmC6Oa1iHqimiIVVvTsO0xKyiASoSn33YCUMTKhcs3wzIoMtn91rHc5ro+JxnVVZl4eE0ydNr5mBKZ1HFlBGe/HcQ9d+R4CQe831yjGT8MKxJQVmjCE5utWJuVBIkInfYxnG0bxNidCJm0sKnmxw/xPZoBTXjNYtSiotSCVVY9Wi/9HYWbZumCBjQ/cFyNsAIq7oZ8ARVXxyC/6+LqoBgIFTdHaT9UXF02+KHi6jomsH7FzYVVINT/daX3LwMnQaO+9llzAAAAAElFTkSuQmCC"
      alt="Icon Check Circle"
    />
  )
}

export default IconCheckCircle

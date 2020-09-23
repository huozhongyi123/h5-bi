import React from 'react'

// @TODO remove props
interface Props {
  className?: string
  size?: number | string
}

const IconCircle: React.FC<Props> = ({ className }) => {
  return (
    <img
      className={className}
      width="12"
      height="12"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADsUlEQVRYR82YXWhbZRjHn/9507RebF08LeJWxFYq4hCbcxLa5XJM5wcqovRmQwcbQ1iFXahQdmG9GAPdxWAdurFBle2mKCLit+wypiQn6ZCJWGxF6hdtzKoXy0lzzl9eaWoauy3ZsvSci1y8583z/t7nec7zBanzIYmpqalNAMy2traHSD4pIg+TvBfAFi2G5BUAP4nIJQCfLC8vf0syPzg4+DcA1nMU6tmUyWQ6ATzr+/5jAOIAIiS/E5FfARRIFrSclfWIiGwF8KBeJ5k2DONzkh/GYrGlG513XSCtlWw2+yjJN0Rku4j8COCCYRhfua77m2maVxcWFpbn5+dL+qCenp5wd3d3Wz6fv6O9vf1u3/cfIblHRO4TkcsAXrcs68vraeuaQMlk8s6Ojo7XfN8/JCK/ABh3XfdcIpG4eqNbVr9PJpMabj/JEQDbAJwqFotvJhKJP9eTsy7Q9PT0/eVyeYzkTgATJM/E4/HZRkBq96bT6T6l1EHP8/YBuBgKhcYGBgZ+qN33PyAN43neeZL9hmG8EolELvT29hZvBaby37m5uY5CobDH9/3jAGaUUntrodYAaTOFw+FxEXkcwAu2bX/cDJBaGY7jPEXyPRH5rFQqjVSbbxVIO3AulzumVaqUOmJZ1rnbAVORmc1m93ued1QpNRGNRkcrjr4K5DjObpLvi8gp0zTHmmWma11Kmy+fz4+JyCEAz9u2/cW/oUP/6DgjInphC8knbtWB69WsdnQAn4rIFRHZreMUVmLNiyRPkhyNx+Pah1r2pNNpHQ6OAXjZsqx3kUqlNiulzgB4wDTNodttqtqbrpguRfJ7z/MO6vzUq5T6WkTejsVix1ummqqDHMd5leRLnuft0qnhaZIThmHsjEaj0xsBlMvlBnzfvwhgHxzHOU1ye7lcfm5oaOiPjQBKpVJ3hUKhDwBc1kDafj93dnYe6O/v/2sjgGZmZjYvLS2dBXAPMpnM7wA+cl33cKOJs1nwKwn4BMlntIaKJE/Mzs4eGR4e9pp1SCNyJicnVV9f31EAh4MHFESTBcupA/fZBy4wVlIHgHds236rka+jWXvXpI7q5FoqlXa0OhbpGBQOh79ZTa7V5QeAUdu2W1p+OI4zQvK/8iNwBVrFDzaihC0UCrrV0n3f2hJWQwWuyNdQgWqDKqYLVKNYDRWYVroCVTtsIDne1dV1ttEmQBfxi4uLBwDc/LChArXeOEZEzuumoJ5xjC7aRWRvU8Yx1WkhMAOraqhWjfT+AWDh4SdTIl99AAAAAElFTkSuQmCC"
      alt="Icon Circle"
    />
  )
}

export default IconCircle
